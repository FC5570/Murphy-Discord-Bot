const Canvacord = require("canvacord");
const { Command } = require("discord-akairo");
const { MessageAttachment } = require("discord.js");

class FusionCommand extends Command {
  constructor() {
    super("fusion", {
      aliases: [
        "fusion",
        "fuse",
        "avatarfusion",
        "avatarfuse",
        "avfuse",
        "avfusion",
        "kek",
      ],
      description: {
        content: "Overlaps avatars of 2 users",
        usage: "fusion [@user1] [@user2]",
        example: [
          "fusion @Shamil @Beatzoid",
          "fusion",
          "fusion @Korabi @His gf",
        ],
      },
      clientPermissions: ["ATTACH_FILES", "SEND_MESSAGES"],
      userPermissions: [],
      category: "Fun",
      cooldown: 4000,
      ratelimit: 1,

      args: [
        {
          id: "user1",
          type: "user",
          default: (message) => message.author,
        },
        {
          id: "user2",
          type: "user",
        },
      ],
    });
  }

  async exec(message, { user1, user2 }) {
    const av1 = user1.displayAvatarURL({ dynamic: false, format: "png" });

    if (!user2) user2 = this.client.user;
    const av2 = user2.displayAvatarURL({ dynamic: false, format: "png" });

    const img = await Canvacord.Canvas.fuse(av1, av2);
    const attach = new MessageAttachment(img, "fused_you_bitch.png");
    message.channel.send(attach);
  }
}

module.exports = FusionCommand;
