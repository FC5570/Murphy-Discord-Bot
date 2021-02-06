const { Listener } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class MessageEvent extends Listener {
  constructor() {
    super("message", {
      emitter: "client",
      event: "message",
    });
  }

  exec(message) {
    if (
      message.content === `<@${this.client.user.id}>` ||
      message.content === `<@!${this.client.user.id}>`
    ) {
      const embed = new MessageEmbed()
        .setTitle("Help has arrived!")
        .setDescription(
          `Please use the help command of the bot to look at its commands. You can use ${this.client.commandHandler.prefix} as a prefix or even mention me with the command. To see help for a specific command, type [prefix]<command name>.`
        )
        .setColor("GREEN")
        .setTimestamp()
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        );
      message.channel.send(embed);
    }
  }
}

module.exports = MessageEvent;
