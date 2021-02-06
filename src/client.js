const {
  AkairoClient,
  CommandHandler,
  ListenerHandler,
} = require("discord-akairo");
const config = require("./config.json");
const { Database } = require("quickmongo");
const db = new Database(config.mongoURI);
const { join } = require("path");
const ms = require("ms");
const { MessageEmbed } = require("discord.js");

class MurphyClient extends AkairoClient {
  constructor(options) {
    super(options);

    this.commandHandler = new CommandHandler(this, {
      directory: join(__dirname, "commands"),
      prefix: config.prefix,
      allowMention: true,
      ignorePermissions: this.ownerID,
      commandUtil: true,
      commandUtilLifetime: 300000,
      handleEdits: true,
      automateCategories: true,
      defaultCooldown: 2000,
    });

    this.eventHandler = new ListenerHandler(this, {
      directory: join(__dirname, "events"),
    });

    this.db = db;
    db.on("ready", () => {
      console.log("Connected to database.");
    });

    this.commandHandler.useListenerHandler(this.eventHandler);
    this.commandHandler.loadAll();
    this.eventHandler.loadAll();

    this.commandHandler.on("cooldown", (message, command, cooldown) => {
      const embed = new MessageEmbed()
        .setTitle("Slow it down bro")
        .setDescription(
          `Youre on a cooldown, wait for ${ms(
            cooldown
          )} to run the \`${command}\` command.`
        )
        .setColor("RED")
        .setTimestamp();
      message.channel.send(embed);
    });
  }
}

module.exports = MurphyClient;
