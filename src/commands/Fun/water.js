const { Command } = require("discord-akairo");
const { MessageAttachment } = require("discord.js");

class WaterCommand extends Command {
  constructor() {
    super("water", {
      aliases: ["water"],
      description: {
        content: "you greedy bitch",
        usage: "water <text>",
        example: ["water kek", "water porn"],
      },
      clientPermissions: ["ATTACH_FILES", "SEND_MESSAGES"],
      userPermissions: [],
      category: "Fun",

      args: [
        {
          id: "text",
          type: "string",
        },
      ],
    });
  }

  async exec(message, { text }) {
    if (!text) return message.channel.send("Specify text");

    const url = `https://vacefron.nl/api/water?text=${text}`;

    const attach = new MessageAttachment(url, "water.png");
    message.channel.send(attach);
  }
}

module.exports = WaterCommand;
