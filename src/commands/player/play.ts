import { SlashCommandBuilder, Client, ChatInputCommandInteraction, Guild, GuildMember } from 'discord.js';
import { ICommand } from '../../interfaces/ICommand.js';

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

    return interaction.reply({ content: 'Zaebok' });
  },
};

export default playCommand;
