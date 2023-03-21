import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import config from './config/config.js';
import loadEvents from './handlers/eventHandler.js';
import loadCommands from './handlers/commandHandler.js';

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client: Client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});
client.commands = new Collection();

await loadEvents(client);
await loadCommands(client);

client.login(config.token).catch((err) => console.log(err));
