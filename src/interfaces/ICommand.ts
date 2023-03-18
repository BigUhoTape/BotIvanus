import { Client, SlashCommandBuilder, CommandInteraction } from 'discord.js';

export interface ICommand {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction, client: Client) => void;
}
