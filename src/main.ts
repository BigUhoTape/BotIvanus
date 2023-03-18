import { Client, GatewayIntentBits, Partials } from 'discord.js';
import config from './config/config.js';
import loadEvents from './handlers/eventHandler.js';

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client: Client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});

client
  .login(config.token)
  .then(() => {
    loadEvents(client);
  })
  .catch((err) => console.log(err));
