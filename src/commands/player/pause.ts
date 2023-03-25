import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from 'discord.js';
import { ICommand } from '../../interfaces/ICommand.js';

const pauseCommand: ICommand = {
  data: new SlashCommandBuilder().setName('pause').setDescription('Pause the music'),
  execute: async (interaction: ChatInputCommandInteraction, client: Client) => {
    const guildId: string | null = interaction.guildId ? interaction.guildId : null;
    if (!guildId) return interaction.reply({ content: 'There is no guild!' });

    const queue = client.player.nodes.get(guildId);
    if (!queue) return interaction.reply({ content: 'There are no songs in the queue!' });

    queue.node.setPaused(true);

    return interaction.reply({ content: 'Music has been paused! Use `/resume` to resume the music' });
  },
};

export default pauseCommand;
