const { Command } = require("discord-akairo");
const Canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");

class SpankCommand extends Command {
  constructor() {
    super("spank", {
      aliases: ["spank", "slapass"],
      description: {
        content: "basically slapping someones ass",
        usage: "spank [@user] [@user]",
        example: ["spank @someone @someone-else", "spank"],
      },
      category: "Fun",
      clientPermissions: ["ATTACH_FILES", "SEND_MESSAGES"],
      userPermissions: [],
      cooldown: 4000,
      ratelimit: 1,

      args: [
        {
          id: "user1",
          type: "user",
        },
        {
          id: "user2",
          type: "user",
          default: (message) => message.author,
        },
      ],
    });
  }

  async exec(message, { user1, user2 }) {
    if (!user1) user1 = this.client.user;

    const av1 = user1.displayAvatarURL({ dynamic: false, format: "png" });
    const av2 = user2.displayAvatarURL({ dyanmic: false, format: "png" });

    const img = await Canvacord.Canvas.spank(av1, av2);
    const attach = new MessageAttachment(img, "youre_fucked.png");
    message.channel.send(attach);
  }
}

module.exports = SpankCommand;
