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

    this.commandHandler.on("missingPermissions", (message, command, type, missing) => {
      if(type.toLowerCase() === 'client') {
        const embed = new MessageEmbed()
        .setTitle("Missing Permissions")
        .setDescription(`**I am** missing **${firstUpperCase(missing.join(', ').replace(/_/gi, " ").toLowerCase())}** permissions, please give me the required permissions for the \`${command}\` command to work.`)
        .setColor("RED")
        .setTimestamp()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
        message.channel.send(embed)
      
      } else if(type.toLowerCase() === 'user') {
        const embed = new MessageEmbed()
        .setTitle("Missing Permissions")
        .setDescription(`**You are** missing **${firstUpperCase(missing.join(', ').replace(/_/gi, " ").toLowerCase())}** permissions, please make sure you have the required permissions for the \`${command}\` command to work.`)
        .setColor("RED")
        .setTimestamp()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(embed)
      }
    })

    this.commandHandler.on("error", async(error, message, command) => {
      const embed = new MessageEmbed()
      .setTitle("An error occured.")
      .setDescription(`An error occured, please DM **${await (await this.users.fetch(this.ownerID)).tag}** if this keeps happening.\n\nError: **${error.stack}**`)
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
      .setColor("RED")
      message.channel.send(embed)

      const embed2 = new MessageEmbed()
      .setTitle("Error occured")
      .setDescription(`**${message.author.tag} (${message.author.id})** ran a command which errored\nCommand: **${command}\n**Server: **${message.guild.name} (${message.guild.id})**\nChannel: **${message.channel.name} (${message.channel.id})**\n\nError: **${error.stack}**`)
      .setTimestamp()
      .setColor("RED")
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      await (await this.users.fetch(this.ownerID)).send(embed2)
    })

    function firstUpperCase(text, split = " ") {
      return text
        .split(split)
        .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join(" ");
    }

  }
}

module.exports = MurphyClient;
