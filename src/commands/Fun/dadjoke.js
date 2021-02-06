const { Command } = require("discord-akairo");
const phin = require("phin");

class DadJokeCommand extends Command {
  constructor() {
    super("dadjoke", {
      aliases: ["dadjoke"],
      description: {
        content: "Shows dad jokes, mostly unfunny jokes.",
        usage: "dadjoke",
        example: ["dadjoke"],
      },
      userPermissions: [],
      clientPermissions: ["SEND_MESSAGES"],
      cooldown: 2000,
      ratelimit: 1,
      category: "Fun",
    });
  }

  async exec(message) {
    const data = await phin({
      url: "https://icanhazdadjoke.com/",
      method: "get",
      headers: {
        Accept: "application/json",
      },
    });
    message.channel.send(JSON.parse(data.body).joke);
  }
}

module.exports = DadJokeCommand;
