const { Command } = require('discord-akairo')
const Canvacord = require('canvacord')
const { MessageAttachment } = require('discord.js')

class OhFuck extends Command {
    constructor() {
        super('ohno', {
            aliases: ['ohno', 'ohfuck'],
            description: {
                content: "oh no! its stupid",
                usage: "ohno [message]",
                examples: [
                    "ohno we're fucked",
                    "ohno",
                ]
            },
            category: "Fun",
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: [],
            cooldown: 2000,
            ratelimit: 1,

            args: [
                {
                    id: "msg",
                    type: "string",
                    default: "kek"
                }
            ]
        })
    }

    async exec(message, { msg }) {
        const img = await Canvacord.Canvas.ohno(msg)
        const attach = new MessageAttachment(img, "png.png")
        message.channel.send(attach)
    }
}

module.exports = OhFuck