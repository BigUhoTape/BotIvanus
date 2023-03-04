const loadCommands = (client) => {
  const ascii = require('ascii-table');
  const fs = require('fs');
  const table = new ascii().setHeading('Commands', 'Status');

  let commandsArr = [];

  const commandsFolder = fs.readdirSync('./commands');
  for (const folder of commandsFolder) {
      const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

      for (const file of commandFiles) {
          const commandFile = require(`../commands/${folder}/${file}`);

          client.commands.set(commandFile.data.name, commandFile);
          commandsArr.push(commandFile.data.toJSON());

          table.addRow(file, 'loaded');
      }
  }

  client.application.commands.set(commandsArr);

  return console.log(table.toString(), '\n Loaded commands');
};

module.exports = { loadCommands }