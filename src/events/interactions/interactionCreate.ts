import { Client, Events } from 'discord.js';
import { IEvent } from '../../interfaces/IEvent.js';

const interactionCreate: IEvent = {
  name: Events.InteractionCreate,
  once: false,
  execute(client: Client) {
    console.log(client);
  },
};

export default interactionCreate;
