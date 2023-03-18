import { Client } from 'discord.js';
import Ascii from 'ascii-table';
import fs from 'fs';
import path from 'path';

//Interfaces
import { IEvent } from '../interfaces/IEvent.js';
//Interfaces

const loadEvents = async (client: Client) => {
  const table = new Ascii().setHeading('Events', 'Status');

  const foldersPath = path.resolve('./src/events');
  const folders = fs.readdirSync(foldersPath);
  for (const folder of folders) {
    const filesPath: string = path.resolve(`./src/events/${folder}`);
    const files = fs.readdirSync(filesPath).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

    for (const file of files) {
      const event: IEvent = await import(`../events/${folder}/${file}`);

      if (event.once) {
        client.once(event.name, () => event.execute(client));
      } else {
        client.on(event.name, () => event.execute(client));
      }

      table.addRow(file, 'loaded');
    }
  }

  return console.log(table.toString(), '\nLoaded events');
};

export default loadEvents;
