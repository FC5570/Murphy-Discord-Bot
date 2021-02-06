const { Command } = require("discord-akairo");
const { MessageAttachment } = require("discord.js");
const Canvacord = require("canvacord");

class CarRevCommand extends Command {
  constructor() {
    super("trash", {
      aliases: ["trash", "garbage"],
      description: {
        content: "youre trash",
        usage: "trash [@user]",
        example: ["trash @Korabi", "trash"],
      },
      category: "Fun",
      clientPermissions: ["ATTACH_FILES", "SEND_MESSAGES"],
      userPermissions: [],
      cooldown: 5000,
      ratelimit: 1,

      args: [
        {
          id: "user",
          type: "user",
          default: (message) => message.author,
        },
      ],
    });
  }

  async exec(message, { user }) {
    const avatar = user.displayAvatarURL({ dynamic: false, format: "png" });

    const img = await Canvacord.Canvas.trash(avatar);
    const attach = new MessageAttachment(img, "youre_trash.png");
    message.channel.send(attach);
  }
}

module.exports = CarRevCommand;
