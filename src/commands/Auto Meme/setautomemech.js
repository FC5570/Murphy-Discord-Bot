const { Command } = require("discord-akairo");
const got = require("got");
const { MessageEmbed } = require("discord.js");
const ms = require("ms");

class SetAutoMemeCh extends Command {
  constructor() {
    super("setautomemech", {
      aliases: ["setautomemech", "setautomemechannel", "setam"],
      description: {
        content:
          "Sets an automemechannel for the server where memes will be sent every x number of seconds/minutes/hours.",
        usage: "setautomemech <channel> <time>",
        example: ["setautomemech #auto-memes 5m", "setautomemech #memes 15s"],
      },
      clientPermissions: [
        "VIEW_CHANNEL",
        "READ_MESSAGE_HISTORY",
        "EMBED_LINKS",
      ],
      userPermissions: ["MANAGE_CHANNELS"],
      cooldown: 15000,
      category: "Auto Meme",
      ratelimit: 1,

      args: [
        {
          id: "channel",
          type: "channel",
        },
        {
          id: "time",
          type: "string",
        },
      ],
    });
  }

  async exec(message, { channel, time }) {
    if (!channel) return message.channel.send("Please specify a channel.");

    if (!time) return message.channel.send("Please specify the time.");
    time = ms(time);
    time = parseInt(time);

    await this.client.db.set(`automeme-${message.guild.id}`, [
      channel.id,
      time,
    ]);
    message.channel.send(
      `Successfully set <#${channel.id}> as the automeme channel.`
    );
    setInterval(async () => {
      const data = await this.client.db.get(`automeme-${message.guild.id}`);
      if (!data) return;

      got("https://www.reddit.com/r/memes/random/.json").then((res) => {
        let content = JSON.parse(res.body);
        const embed = new MessageEmbed()
          .setTitle(content[0].data.children[0].data.title)
          .setImage(content[0].data.children[0].data.url)
          .setColor("RANDOM")
          .setFooter(
            `👍 ${content[0].data.children[0].data.ups} | 💬 ${content[0].data.children[0].data.num_comments}`
          );
        this.client.channels.cache.get(channel.id).send(embed);
      });
    }, time);
  }
}

module.exports = SetAutoMemeCh;
