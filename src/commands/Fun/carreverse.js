const { Command } = require("discord-akairo");
const { MessageAttachment } = require("discord.js");

class CarRevCommand extends Command {
  constructor() {
    super("carreverse", {
      aliases: ["carreverse", "carrev"],
      description: {
        content:
          "Reverse your car because of something, idk how to describe this someone teach me english",
        usage: "carreverse <tex>",
        example: ["carreverse something happened"],
      },
      category: "Fun",
      clientPermissions: ["ATTACH_FILES", "SEND_MESSAGES"],
      userPermissions: [],
      cooldown: 5000,
      ratelimit: 1,

      args: [
        {
          id: "text",
          type: "string",
        },
      ],
    });
  }

  exec(message, { text }) {
    if (!text) text = "Specify some text dumbo";

    const url = `https://vacefron.nl/api/carreverse?text=${text}`;
    const attach = new MessageAttachment(url, "kek.png");
    message.channel.send(attach);
  }
}

module.exports = CarRevCommand;
