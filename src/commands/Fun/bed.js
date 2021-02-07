const { Command } = require("discord-akairo");
const Canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");

class BedCommand extends Command {
  constructor() {
    super("bed", {
      aliases: ["bed"],
      description: {
        content: "why do you hate me ~~bitch~~ brother",
        usage: "bed [@user]",
        examples: ["bed @Noobie", "bed"],
      },
      clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      userPermissions: [],
      cooldown: 2000,
      ratelimit: 1,
      category: "Fun",

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
    const clientAv = this.client.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });
    const userAv = user.displayAvatarURL({ dynamic: false, format: "png" });
    const img = await Canvacord.Canvas.bed(clientAv, userAv);
    const attach = new MessageAttachment(img, "bed.png");
    message.channel.send(attach);
  }
}

module.exports = BedCommand;
