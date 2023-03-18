import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { ICommand } from '../../interfaces/ICommand.js';

const pingCommand: ICommand = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Pong'),
  execute(interaction: CommandInteraction) {
    return interaction.reply({ content: 'Pong!', ephemeral: true });
  },
};

export default pingCommand;
