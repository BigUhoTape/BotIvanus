const {
    ComponentType,
    EmbedBuilder,
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Список всех команд.'),
    async execute (interaction) {
        const directories = [
            ...new Set(interaction.client.commands.map(cmd => cmd.folder))
        ];

        const formatString = str => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        const categories = directories.map(dir => {
            const getCommands = interaction.client.commands
                .filter(cmd => cmd.folder === dir)
                .map(cmd => {
                    return {
                        name: cmd.data.name,
                        description: cmd.data.description || 'Нет описания'
                    }
                });

            return {
                directory: formatString(dir),
                commands: getCommands
            }
        });

        const embed =  new EmbedBuilder()
            .setDescription('Выберите категорию.');

        const components = state => [
            new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('help-menu')
                    .setPlaceholder('Выберите категорию')
                    .setDisabled(state)
                    .addOptions(categories.map(cmd => {
                        return {
                            label: cmd.directory,
                            value: cmd.directory.toLowerCase(),
                            description: `Команды из категории ${cmd.directory}`
                        }
                    }))
            )
        ];

        const initialMessage = await interaction.reply({
            embeds: [embed],
            components: components(false)
        });

        const filter = interaction => interaction.user.id === interaction.member.id;

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            componentType: ComponentType.SelectMenu
        });

        collector.on('collect', interaction => {
            const [directory] = interaction.values;
            const category = categories.find(x => x.directory.toLowerCase() === directory);

            const categoryEmbed = new EmbedBuilder()
                .setTitle(`Команды из категории ${formatString(directory)}`)
                .addFields(category.commands.map(cmd => {
                    return {
                        name: `\`${cmd.name}\``,
                        value: cmd.description,
                        inline: true
                    }
                }));

            interaction.update({embeds: [categoryEmbed]});
        });

        collector.on('end', () => {
            initialMessage.edit({components: components(true)});
        });
    }
};