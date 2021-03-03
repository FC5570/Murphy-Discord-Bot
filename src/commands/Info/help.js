const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const ms = require("ms");

class helpCommand extends Command {
  constructor() {
    super("help", {
      aliases: ["help", "commands", "cmds"],
      description: {
        content: "self explainatory",
        example: ["help", "help [command]"],
        usage: "help",
      },
      clientPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
      userPermissions: [],
      category: "Other",
      cooldown: 2000,
      ratelimit: 1,

      args: [
        {
          id: "command",
          type: "commandAlias",
          default: null,
        },
      ],
    });
  }

  async exec(message, { command }) {
    const msg = await message.channel.send("help yourself");
    await msg.delete();
    if (command) {
      let userPerms = command.userPermissions.join(", ");
      if (userPerms === "ownerOnly") userPerms = "Owner Only";

      let embed1 = new MessageEmbed()
        .setColor("RANDOM")
        .setFooter("<> - required fields | [] - optional fields")
        .setAuthor(
          this.client.user.username,
          this.client.user.displayAvatarURL({ dynamic: true })
        ).setDescription(`**Command**: **${command}**\n**Aliases:** ${
        command.aliases
          ? command.aliases.join(", ")
          : "No aliases for this command"
      }\n**Description:** ${
        command.description.content || "No Description."
      }\n**Usage:** ${this.client.commandHandler.prefix}${
        command.description.usage || "No Usage"
      }
      \n**Cooldown:** ${ms(command.cooldown, { long: true })}\n**Category:** ${
        command.category || "No Category"
      }\n\n**Exampless:**\n ${
        command.description.example
          ? command.description.example
              .map(
                (m, i) =>
                  `**${i + 1}**: ${this.client.commandHandler.prefix}${m}`
              )
              .join("\n")
          : "No examples."
      }\n\n**Bot Permissions:** ${
        firstUpperCase(
          command.clientPermissions.join(", ").toLowerCase().replace(/_/gi, " ")
        ) || "None."
      }\n**User Permissions:** ${
        firstUpperCase(userPerms.toLowerCase().replace(/_/gi, " ")) || "None."
      }
            `);
      return message.channel.send(embed1);
    }

    const owner = await this.client.users
      .fetch(this.client.ownerID)
      .then((m) => m.tag);
    const embed = new MessageEmbed()
      .setTitle("Help is here!")
      .setColor("RANDOM")
      .setDescription(
        `**Murphy's Default prefix is \`${this.client.commandHandler.prefix}\`**\nUse \`,help <command name>\` to get Info about a specific command. Example: \`,help ping\`.\nIf you still need help, dm **${owner}**.\n**PS example in certain commands have names of my friends and some funny example, this is just a joke, don\'t take it seriously**`
      )
      .setFooter(`Total Commands - ${this.client.commandHandler.modules.size}`)
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();

    for (const category of this.handler.categories.values()) {
      if (["default"].includes(category.id)) continue;
      embed.addField(
        category.id,
        category.map((c) => `${c}`).join(", ") ||
          "No commands in this category."
      );
    }
    return message.channel.send(embed);

    function firstUpperCase(text, split = " ") {
      return text
        .split(split)
        .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join(" ");
    }
  }
}

module.exports = helpCommand;
