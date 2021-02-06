const { Command } = require("discord-akairo");
const { MessageAttachment } = require("discord.js");

class ShameCommand extends Command {
  constructor() {
    super("shame", {
      aliases: ["shame", "dockofshame"],
      description: {
        content: "Idk what this does tbh",
        usage: "shame [@user]",
        example: ["shame @Salvage_Dev", "dockofshame"],
      },
      clientPermissions: ["ATTACH_FILES", "SEND_MESSAGES"],
      userPermissions: [],
      category: "Fun",

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
    const av = user.displayAvatarURL({ dynamic: false, format: "png" });
    const url = `https://vacefron.nl/api/dockofshame?user=${av}`;

    const attach = new MessageAttachment(url, "shame.png");
    message.channel.send(attach);
  }
}

module.exports = ShameCommand;
