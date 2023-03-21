import { Client, Interaction, Message } from 'discord.js';

export type EventArgType = Interaction | Message;

export interface IEvent {
  name: string;
  once: boolean;
  execute: (client: Client, arg: EventArgType) => void;
}
