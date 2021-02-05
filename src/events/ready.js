const { Listener } = require('discord-akairo')
const got = require("got")
const { MessageEmbed } = require("discord.js")

class ReadyEvent extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        })
    }

    exec() {
        console.log(`${this.client.user.tag} has logged in.`)

        this.client.guilds.cache.forEach(async (g) => {
            const data = await this.client.db.fetch(`automeme-${g.id}`);
            if (!data) return;
            const time = data[1];
            const channel = data[0]

            setInterval(async () => {
              if (!time) return;
              if(!channel) return;
              got("https://www.reddit.com/r/memes/random/.json").then((res) => {
                let content = JSON.parse(res.body);
                const embed = new MessageEmbed()
                  .setTitle(content[0].data.children[0].data.title)
                  .setImage(content[0].data.children[0].data.url)
                  .setColor("RANDOM")
                  .setFooter(
                    `👍 ${content[0].data.children[0].data.ups} | 💬 ${content[0].data.children[0].data.num_comments}`
                  );
                this.client.channels.cache.get(channel).send(embed);
              });
            }, time);
          });
    }
}

module.exports = ReadyEvent