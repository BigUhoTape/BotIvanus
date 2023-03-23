import { Client, SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export interface ICommand {
  data: Omit<
    SlashCommandBuilder,
    | 'addBooleanOption'
    | 'addUserOption'
    | 'addChannelOption'
    | 'addRoleOption'
    | 'addAttachmentOption'
    | 'addMentionableOption'
    | 'addStringOption'
    | 'addIntegerOption'
    | 'addNumberOption'
  >;
  execute: (interaction: ChatInputCommandInteraction, client: Client) => void;
}
