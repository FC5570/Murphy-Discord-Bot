const { Command } = require("discord-akairo");
const { MessageAttachment } = require("discord.js");
const Canvacord = require("canvacord");

class BurnCommand extends Command {
  constructor() {
    super("burn", {
      aliases: ["burn", "die"],
      description: {
        content: "burns you to death.....jk",
        usage: "burn [@user]",
        example: ["burn @Korabi", "burn"],
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
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const lvl = number[Math.floor(Math.random() * number.length)];

    const avatar = user.displayAvatarURL({ dynamic: false, format: "png" });

    const img = await Canvacord.Canvas.burn(avatar, lvl);
    const attach = new MessageAttachment(img, "burnt_to_death.png");
    message.channel.send(attach);
  }
}

module.exports = BurnCommand;
