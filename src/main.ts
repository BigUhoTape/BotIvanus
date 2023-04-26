import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import * as dotenv from 'dotenv';
import loadEvents from './handlers/eventHandler.js';
import loadCommands from './handlers/commandHandler.js';
import { Player } from 'discord-player';

dotenv.config();

if (process.env.DISCORD_LOGIN_TOKEN) throw new Error("DISCORD_LOGIN_KEY doesn't exist!");
if (process.env.CLIENT_ID) throw new Error("CLIENT_ID doesn't exist!");

const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client: Client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates],
  partials: [User, Message, GuildMember, ThreadMember],
});
client.commands = new Collection();
client.player = new Player(client, {
  ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25,
  },
});

await loadEvents(client);
await loadCommands(client);

client.login(process.env.DISCORD_LOGIN_TOKEN).catch((err) => console.log(err));
