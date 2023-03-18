import { Client, Events } from 'discord.js';
import { IEvent } from '../../interfaces/IEvent.js';

const ready: IEvent = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    if (client.user) return console.log(`${client.user.username} is now online.`);
    console.log('Error');
  },
};

export default ready;
