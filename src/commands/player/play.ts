import { SlashCommandBuilder, Client, ChatInputCommandInteraction, Guild, GuildMember, EmbedBuilder } from 'discord.js';
import { ICommand } from '../../interfaces/ICommand.js';
import { QueryType } from 'discord-player';

const playCommand: ICommand = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play songs from youtube.')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('song')
        .setDescription('Loads a single song from a url.')
        .addStringOption((option) => option.setName('url').setDescription("The song's url").setRequired(true)),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('playlist')
        .setDescription('Loads a playlist from a url.')
        .addStringOption((option) => option.setName('url').setDescription("The playlist's url").setRequired(true)),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('search')
        .setDescription('Searches for a song based on provided keywords.')
        .addStringOption((option) =>
          option.setName('searchterms').setDescription('The search keywords').setRequired(true),
        ),
    ),
  async execute(interaction: ChatInputCommandInteraction, client: Client) {
    const guildId: string | null = interaction.guildId ? interaction.guildId : null;
    if (!guildId) return interaction.reply({ content: 'There is no guild!' });

    const guild: Guild | undefined = client.guilds.cache.get(guildId);
    if (!guild) return interaction.reply({ content: 'There is no guild!' });

    const member: GuildMember | undefined = guild.members.cache.get(interaction.user.id);
    if (!member) return interaction.reply({ content: 'There is no guild member' });

    if (!member.voice.channel)
      return interaction.reply({ content: 'You need to be in voice channel to use this command!' });

    const queue = await client.player.nodes.create(guild, {
      volume: 50,
      leaveOnEmpty: true,
      leaveOnEnd: true,
      leaveOnStop: true,
    });
    if (!queue.connection) await queue.connect(member.voice.channel);

    const response = new EmbedBuilder();
    const subCommand: string = interaction.options.getSubcommand();

    if (subCommand === 'song') {
      const url: string | null = interaction.options.getString('url');
      if (!url) return interaction.reply({ content: 'Where is url?' });

      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_VIDEO,
      });
      if (result.tracks.length === 0) return interaction.reply({ content: 'No results!' });

      const song = result.tracks[0];
      await queue.addTrack(song);

      response
        .setDescription(`[${song.title}] has been added to queue!`)
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration ${song.duration}` });
    } else if (subCommand === 'playlist') {
      const url: string | null = interaction.options.getString('url');
      if (!url) return interaction.reply({ content: 'Where is url?' });

      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_PLAYLIST,
      });
      if (result.tracks.length === 0) return interaction.reply({ content: 'No results!' });

      const playlist = result.playlist;
      if (!playlist) return interaction.reply({ content: 'There is no playlist!' });
      await queue.addTrack(result.tracks);

      response.setDescription(`[${playlist.title}] has been added to queue!`);
    } else if (subCommand === 'search') {
      const url: string | null = interaction.options.getString('searchterms');
      if (!url) return interaction.reply({ content: 'There is no Keywords!' });

      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      });
      if (result.tracks.length === 0) return interaction.reply({ content: 'No results!' });

      const song = result.tracks[0];
      await queue.addTrack(song);

      response
        .setDescription(`[${song.title}] has been added to queue!`)
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration ${song.duration}` });
    }

    await interaction.reply({ embeds: [response] });

    if (!queue.isPlaying()) await queue.node.play();
  },
};

export default playCommand;
