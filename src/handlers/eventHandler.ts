import { Client } from 'discord.js';
import Ascii from 'ascii-table';
import fs from 'fs';
import path from 'path';
import envVariables from '../helpers/envVariables.js';

//Interfaces
import { IEvent } from '../interfaces/IEvent.js';
//Interfaces

const loadEvents = async (client: Client) => {
  const { extension, rootDir } = envVariables;
  const table = new Ascii().setHeading('Events', 'Status');

  const foldersPath = path.join(rootDir, '/events');
  const folders = fs.readdirSync(foldersPath);
  for (const folder of folders) {
    const filesPath: string = path.join(rootDir, `/events/${folder}`);
    const files = fs.readdirSync(filesPath).filter((file) => file.endsWith(extension));

    for (const file of files) {
      const eventDefault = await import(`../events/${folder}/${file}`);
      const event: IEvent = eventDefault.default;

      if (event.once) {
        client.once(event.name, (args) => event.execute(client, args));
      } else {
        client.on(event.name, (args) => event.execute(client, args));
      }

      table.addRow(file, 'loaded');
    }
  }

  return console.log(table.toString(), '\nLoaded events');
};

export default loadEvents;
