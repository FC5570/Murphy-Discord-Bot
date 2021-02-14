const { Command } = require("discord-akairo");
const { MessageAttachment } = require('discord.js')

class kek extends Command {
  constructor() {
    super("porn", {
      aliases: ["porn"],
      description: {
        content: "😏",
        usage: "porn [request/query]",
        examples: ["porn"],
      },
      category: "Fun",
      clientPermissions: ["SEND_MESSAGES"],
      userPermissions: [],
      cooldown: 2000,
      ratelimit: 1,
    });
  }

  async exec(message) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const attach = new MessageAttachment("https://i.imgur.com/UYwVVyU.gif", "SPOILER_you_greedy_bitch.gif")

    try {
    message.member.send(attach)
    await delay(7000)
    message.member.send('get rickrolled you greedy bitch')
    message.channel.send("check your dms 😏")
    } catch(e) {
      console.log(e)
      return message.channel.send("how do you expect me to send porn to you if your dms are not enabled smh")
    }
  }
}

module.exports = kek;
