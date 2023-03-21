import { Client, Events } from 'discord.js';
import { IEvent, EventArgType } from '../../interfaces/IEvent.js';
import { checkIsInteraction } from '../../helpers/checkEventInstance.js';

const interactionCreate: IEvent = {
  name: Events.InteractionCreate,
  once: false,
  execute(client: Client, interaction: EventArgType) {
    if (!checkIsInteraction(interaction)) return console.log('Error');
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return interaction.reply({ content: 'Command Not Found!' });

    command.execute(interaction, client);
  },
};

export default interactionCreate;
