import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from 'discord.js';
import { ICommand } from '../../interfaces/ICommand.js';

const stopCommand: ICommand = {
  data: new SlashCommandBuilder().setName('stop').setDescription('Stops the bot and clears the queue!'),
  execute: async (interaction: ChatInputCommandInteraction, client: Client) => {
    const guildId: string | null = interaction.guildId ? interaction.guildId : null;
    if (!guildId) return interaction.reply({ content: 'There is no guild!' });

    const queue = client.player.nodes.get(guildId);
    if (!queue) return interaction.reply({ content: 'There are no songs in the queue!' });

    await queue.delete();

    return await interaction.reply({ content: 'Bye!' });
  },
};

export default stopCommand;
