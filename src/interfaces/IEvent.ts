import { Client } from 'discord.js';

export interface IEvent {
  name: string;
  once: boolean;
  execute: (client: Client) => void;
}
