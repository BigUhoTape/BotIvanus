import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { ICommand } from '../../interfaces/ICommand.js';
import config from '../../config/config.js';

const prefixCommand: ICommand = {
  data: new SlashCommandBuilder().setName('prefix').setDescription('Find out the prefix.'),
  execute(interaction: ChatInputCommandInteraction) {
    return interaction.reply({ content: config.prefix, ephemeral: true });
  },
};

export default prefixCommand;
