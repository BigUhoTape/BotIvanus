import { Client, REST, Routes } from 'discord.js';
import Ascii from 'ascii-table';
import fs from 'fs';
import path from 'path';

//Interfaces
import { ICommand } from '../interfaces/ICommand.js';
//Interfaces

const loadCommands = async (client: Client) => {
  const loginToken: string = process.env.DISCORD_LOGIN_TOKEN || '';
  const clientId: string = process.env.CLIENT_ID || '';

  const table = new Ascii().setHeading('Commands', 'Status');

  const commandsArr = [];
  const foldersPath = path.resolve('./src/commands');
  const folders = fs.readdirSync(foldersPath);
  for (const folder of folders) {
    const commandFilesPath = path.resolve(`${foldersPath}/${folder}`);
    const commandFiles = fs
      .readdirSync(commandFilesPath)
      .filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

    for (const file of commandFiles) {
      const commandFilePath = path.resolve(`./src/commands/${folder}/${file}`);
      const commandFileDefault = await import(commandFilePath);
      const commandFile: ICommand = commandFileDefault.default;

      const properties = { folder, ...commandFile };
      client.commands.set(commandFile.data.name, properties);

      commandsArr.push(commandFile.data.toJSON());
      table.addRow(file, 'loaded');
    }
  }

  console.log(`Started refreshing ${commandsArr.length} application (/) commands.`);
  const rest: REST = new REST({ version: '10' }).setToken(loginToken);
  await rest.put(Routes.applicationCommands(clientId), { body: commandsArr });
  console.log(`Successfully reloaded ${commandsArr.length} application (/) commands.`);
  if (client.application) client.application.commands.set(commandsArr);

  return console.log(table.toString(), '\n Loaded commands');
};

export default loadCommands;
