const { Command } = require("discord-akairo");

class RemoveAuto extends Command {
  constructor() {
    super("removeautomemech", {
      aliases: ["removeautomemech", "removememechannel", "retam", "detam"],
      description: {
        content: "Removes the set automemechannel for the server.",
        usage: "removeautomemech",
        example: ["removeautomemech"],
      },
      clientPermissions: [
        "VIEW_CHANNELS",
        "READ_MESSAGE_HISTORY",
        "EMBED_LINKS",
      ],
      userPermissions: ["MANAGE_CHANNELS"],
      category: "Auto Meme",
      cooldown: 15000,
      ratelimit: 1,
    });
  }

  async exec(message) {
    const data = await this.client.db.fetch(`automeme-${message.guild.id}`);

    if (data) {
      await this.client.db.delete(`automeme-${message.guild.id}`);
    } else
      return message.channel.send(
        "Auto-meme is already disabled in this server."
      );
    message.channel.send("Automeme has been successfully turned off.");
  }
}

module.exports = RemoveAuto;
