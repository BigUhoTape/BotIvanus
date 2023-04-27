import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { ICommand } from '../../interfaces/ICommand.js';

const pingCommand: ICommand = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Pong'),
  execute(interaction: ChatInputCommandInteraction) {
    return interaction.reply({ content: 'Pong!', ephemeral: true });
  },
};

export default pingCommand;
