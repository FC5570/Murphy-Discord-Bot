const { Command } = require("discord-akairo");
const { MessageAttachment } = require("discord.js");
const Canvacord = require("canvacord");

class ShitCommand extends Command {
  constructor() {
    super("shit", {
      aliases: ["shit", "crap"],
      description: {
        content: "Step on someone and it shows them on your foot",
        usage: "shit [@user]",
        example: ["shit", "shit @FC"],
      },
      userPermissions: [],
      clientPermissions: ["ATTACH_FILES", "SEND_MESSAGES"],
      category: "Fun",
      cooldown: 2000,
      ratelimit: 1,

      args: [
        {
          id: "user",
          type: "user",
          default: (msg) => msg.author,
        },
      ],
    });
  }

  async exec(message, { user }) {
    const avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    const img = await Canvacord.Canvas.shit(avatar);
    const attach = new MessageAttachment(img, "shit.png");
    message.channel.send(attach);
  }
}

module.exports = ShitCommand;
