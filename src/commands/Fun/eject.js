const { Command } = require("discord-akairo");
const { MessageAttachment } = require("discord.js");
const phin = require("phin");

class EjectCommand extends Command {
  constructor() {
    super("eject", {
      aliases: ["eject", "imposter"],
      description: {
        content: "Ejects someone",
        usage: "eject [@user]",
        example: ["eject @FC", "eject"],
      },
      clientPermissions: ["ATTACH_FILES", "SEND_MESSAGES"],
      userPermissions: [],
      category: "Fun",
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
    let Colors = [
      "black",
      "blue",
      "brown",
      "cyan",
      "darkgreen",
      "lime",
      "orange",
      "pink",
      "purple",
      "red",
      "white",
      "yellow",
    ];
    let Colord = Colors[Math.floor(Math.random() * Colors.length)];
    let Imposter = [true, false];
    let Impost = Imposter[Math.floor(Math.random() * Imposter.length)];
    let Link = `https://vacefron.nl/api/ejected?name=${user.username
      .replace("  ", "")
      .split(" ")
      .join("+")}&impostor=${Impost}&crewmate=${Colord}`;

    const eject = new MessageAttachment(Link, `${user.username} ejected.png`);
    await message.channel.send(eject);
  }
  catch(e) {
    console.log(e);
  }
}

module.exports = EjectCommand;
