const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const phin = require('phin')

class MemeCommand extends Command {
    constructor() {
        super('meme', {
            description: {
                content: "Shows memes, what else do you expect",
                usage: "meme",
                example: [
                    "meme"
                ]
            },
            aliases: ['meme'],
            clientPermissions: ['EMBED_LINKS', 'SEND_MESSAGES'],
            userPermissions: [],
            cooldown: 2000,
            ratelimit: 1,
        })
    }

    async exec(message) {
        const data = await phin({
            url: "https://some-random-api.ml/meme",
            method: 'get',
            parse: 'json'
        })

        const embed = new MessageEmbed()
        .setTitle(data.body.caption)
        .setImage(data.body.image)
        .setTimestamp()
        .setColor("RANDOM")
        message.channel.send(embed)
    }
}

module.exports = MemeCommand