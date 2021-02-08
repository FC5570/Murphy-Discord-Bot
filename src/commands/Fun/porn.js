const { Command } = require('discord-akairo')

class kek extends Command {
    constructor() {
        super('porn', {
            aliases: ['porn'],
            description: {
                content: "😏",
                usage: "porn [request/query]",
                examples: [
                    "porn",
                ]
            },
            category: "Fun",
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: [],
            cooldown: 2000,
            ratelimit: 1,
        })
    }

    async exec(message) {
        return message.channel.send("you really thought you would get porn didnt you, you greedy bitch")
    }
}

module.exports = kek