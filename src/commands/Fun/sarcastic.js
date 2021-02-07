const { Command } = require('discord-akairo')

class SarcasticCommand extends Command {
    constructor() {
        super('sarcastic', {
            aliases: ['sarcastic'],
            description: {
                content: "converts text to sarcastic tExT",
                usage: 'sarcastic <text>',
                example: [
                    "sarcastic korabi is power hungry, || jk dont ban ||",
                    "sarcastic test"
                ]
            },
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: [],
            category: "Fun",
            cooldown: 2000,
            ratelimit: 1,

            args: [
                {
                    id: 'text',
                    type: 'string'
                }
            ]
        })
    }

    exec(message, { text }) {
        if(!text) return message.channel.send("Specify some text")
        message.channel.send(sarcastic(text))

        function sarcastic(text) {
            return text.split("").map((char, i) => char[`to${i % 2 ? "Upper" : "Lower"}Case`]()).join("")
        }
    }
}

module.exports = SarcasticCommand