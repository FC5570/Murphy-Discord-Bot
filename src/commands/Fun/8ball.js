const { Command } = require("discord-akairo");
const phin = require("phin");

class EightBallCommand extends Command {
  constructor() {
    super("8ball", {
      aliases: ["8ball", "eightball"],
      description: {
        content: "Ask a question and the mighty 8ball will answer it.",
        usage: "8ball <question>",
        example: ["8ball do i have a life? Reply = Probably not"],
      },
      category: "Fun",
      clientPermissions: ["SEND_MESSAGES"],
      userPermissions: [],
      cooldown: 2000,
      ratelimit: 1,

      args: [
        {
          id: "question",
          type: "string",
        },
      ],
    });
  }

  async exec(message, { question }) {
    if (!question) {
      question = "Why did I not specify a question?";
      return message.channel.send(
        `> Question: ${question}\nAnswer: Because you're dumb.`
      );
    } else if (question) {
      const data = await phin({
        url: `https://no-api-key.com/api/v1/magic8ball?text=${question}`,
        method: "get",
      });
      return message.channel.send(
        `> Question: ${question}\nAnswer: ${JSON.parse(data.body).response}`
      );
    }
  }
}

module.exports = EightBallCommand;
