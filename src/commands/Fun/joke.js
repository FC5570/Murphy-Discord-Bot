const { Command } = require("discord-akairo");
const phin = require("phin");

class JokeCommand extends Command {
  constructor() {
    super("joke", {
      aliases: ["joke"],
      description: {
        content: "joke",
        usage: "joke",
        example: ["joke"],
      },
      userPermissions: [],
      clientPermissions: ["SEND_MESSAGES"],
      category: "Fun",
      cooldown: 2000,
      ratelimit: 1,
    });
  }

  async exec(message) {
    const data = await phin({
      url: "https://bruhapi.xyz/joke",
      parse: "json",
      method: "get",
    });

    message.channel.send(data.body.res);
  }
}

module.exports = JokeCommand;
