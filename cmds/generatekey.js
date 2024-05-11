const { MessageEmbed } = require('discord.js');
const fs = require('fs');

function generateKeyCommand(message, keys, user) {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
        const noPermissionEmbed = new MessageEmbed()
            .setColor('#2b2d31')
            .setDescription("You don't have permission to use this command.")
            .setFooter('@lxnnystealer')
            .setAuthor('Lxnny Stealer', 'https://i.ibb.co/Sd3TP0m/image.png');

        message.channel.send({ embeds: [noPermissionEmbed] })
            .then(sentEmbed => {
                setTimeout(() => {
                    sentEmbed.delete();
                }, 3500);
            });
        return;
    }

    if (!user) {
        const mentionEmbed = new MessageEmbed()
            .setColor('#2b2d31')
            .setDescription("Please mention a user to send the key to.")
            .setFooter('@lxnnystealer')
            .setAuthor('Lxnny Stealer', 'https://i.ibb.co/Sd3TP0m/image.png');

        message.channel.send({ embeds: [mentionEmbed] })
            .then(sentEmbed => {
                setTimeout(() => {
                    sentEmbed.delete();
                }, 3500);
            });
        return;
    }

    const key = generateKey();
    keys[user.id] = key;
    saveKeys(keys); 

    const keyEmbed = new MessageEmbed()
        .setColor('#2b2d31')
        .setDescription(`Hi, <@${user.id}>, thanks for buying Lxnny Stealer!\nTo use, give the command: \`$build {webhook} {name}\``)
        .setAuthor('Lxnny Stealer', 'https://i.ibb.co/Sd3TP0m/image.png')
        .addFields(
            {
                name: "<:guide:1226372543376658535> How will I receive the build?",
                value: "*You will receive a notification on your webhook that the file is being built. Once it's finished, your webhook will send the download link for your executable. It may take around 6 minutes, so please be patient.*"
            }
        )
        .setThumbnail('https://i.ibb.co/Sd3TP0m/image.png')
        .setFooter('@lxnnystealer');
    user.send({ embeds: [keyEmbed] })
        .then(() => {
            const costumerRole = message.guild.roles.cache.find(role => role.name === "Customers");
            if (costumerRole) {
                message.guild.members.fetch(user.id)
                    .then(member => {
                        member.roles.add(costumerRole);
                    })
                    .catch(console.error);
            }
            const successEmbed = new MessageEmbed()
                .setColor('#2b2d31')
                .setDescription(`Hi, ${user}, check your DM.`)
                .setFooter('@lxnnystealer')
                .setAuthor('Lxnny Stealer', 'https://i.ibb.co/Sd3TP0m/image.png')
                .setThumbnail('https://i.ibb.co/Sd3TP0m/image.png');

            message.channel.send({ embeds: [successEmbed] })
                .then(sentEmbed => {
                    setTimeout(() => {
                        sentEmbed.delete();
                    }, 3500);
                });
        })
        .catch(() => {
            const errorEmbed = new MessageEmbed()
                .setColor('#2b2d31')
                .setDescription(`Could not send DM to ${user}.`)
                .setFooter('@lxnnystealer')
                .setAuthor('Lxnny Stealer', 'https://i.ibb.co/Sd3TP0m/image.png')
                .setThumbnail('https://i.ibb.co/Sd3TP0m/image.png');
            message.channel.send({ embeds: [errorEmbed] })
                .then(sentEmbed => {
                    setTimeout(() => {
                        sentEmbed.delete();
                    }, 3500);
                });
        });
}

function generateKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 8; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}

function saveKeys(keys) { 
    fs.writeFileSync('./keys.json', JSON.stringify(keys, null, 4), 'utf-8', err => {
        if (err) {
            console.error('Error saving keys to file:', err);
        }
    });
}

module.exports = generateKeyCommand; 