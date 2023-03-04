const {Client, GatewayIntentBits, Partials, Collection} = require("discord.js");

const {Guilds, GuildMembers, GuildMessages} = GatewayIntentBits;
const {User, Message, GuildMember, ThreadMember, Channel} = Partials;

const { loadEvents } = require('./handlers/eventHandler');
const { loadCommands } = require('./handlers/commandHandler');

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember],
});

client.commands = new Collection();
client.config = require('./config.json');
client.login(client.config.token)
    .then(() => {
        loadEvents(client);
        loadCommands(client);
    })
    .catch(err => console.log(err));