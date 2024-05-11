const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config = require('../config.json');

module.exports = async (interaction) => {
    const embed = new MessageEmbed()
        .setAuthor(`Lxnny Stealer - Ticket System`, '')
        .setDescription(`Please select your reason from the menu below.`)
        .setFooter(`@lxnnystealer`)
        .setColor(0x2b2d31);

    let row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('ticket-reason')
                .setPlaceholder('❯ Select a Reason')
                .addOptions([
                    {
                        label: 'Buy Licence',
                        description: 'Click Me To Buy A Licence From Grabber',
                        value: 'buy-grabber',
                        emoji: '🛒'
                    },
                    {
                        label: 'Replace Webhook',
                        description: 'Click Me To Replace Webhook Of A Licence',
                        value: 'replace-grabber',
                        emoji: '📝'
                    },
                    {
                        label: 'Support',
                        description: 'Click Me For Queries/Support.',
                        value: 'support-grabber',
                        emoji: '📪'
                    }
                ])
        );

    await interaction.reply({ embeds: [embed], components: [row] });
};

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ticket", "ticket-system"],
    permLevel: 0
};

module.exports.help = {
    name: "tickets",
    description: "Ticket System For Stealer",
    usage: "tickets"
};
