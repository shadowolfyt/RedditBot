const Discord = require('discord.js');
const meme = require('memejs');
const client = new Discord.Client({disableEveryone: true});


// Bot Ready Event
client.on('ready', () => {
  let pluralnonpluralservers = (client.guilds.size > 1) ? 'Servers' : 'Server';
  let pluralnonpluralusers = (client.users.size > 1) ? 'Users' : 'User';

  console.log(`\n\n${client.user.username} is online.\nOperating on ${client.guilds.size} ${pluralnonpluralservers}.\nOperating for ${client.users.size} ${pluralnonpluralusers}.\n\n`);
  client.user.setActivity('Just a meme lol');

  function setActivity() {
    const Gameinfo = ['Source: http://bit.ly/rodneybotsource', 'Developer: shadowolf#9212', 'Discord: http://bit.ly/mancavediscord', 'Invite: http://bit.ly/inviterodney', `Running on ${client.guilds.size} ${pluralnonpluralservers}`, `Running for ${client.users.size} ${pluralnonpluralusers}`];
    var info = Gameinfo[Math.floor(Math.random() * Gameinfo.length)];

    client.user.setActivity(info);
    console.log(`[Console] Activity set to (${info})`);
  };

  setInterval (function () {
    const channel = client.channels.find('name', 'memes');

    meme(function(data) {
      const embed = new Discord.RichEmbed()
      .setTitle(data.title[0])
      .setImage(data.url[0])
      channel.send(embed).catch(console.error);
    })}, 600000);
});


// Bot on Join event
client.on('guildCreate', (guild) => {
  console.log(`\n\n[Console] Joined the Guild ${guild.name}.\nGuild Owner: ${guild.owner.user.tag}\nNumber of Members: ${guild.memberCount}\nGuild Location: ${guild.region}\n\n`);

  const embed = new Discord.RichEmbed()
  .setTitle('Cheers for the invite!')
  .setThumbnail('https://i.imgur.com/hWonxMb.png')
  .setColor('#ffa500')
  .setDescription(`Thanks for inviting me to your Discord guild. I will be your meme provider. I will be posting memes in the #memes channel every 10 minutes. If you have not created a #memes channel, please do so.\n\nMy Developer is shadowolf#9212`)
  guild.channels.find(`name`,`general`).send(embed);
});


//Bot on Leave event
client.on('guildDelete', (guild) => {
  console.log(`\n\n[Console] Left the Guild ${guild.name}.\nGuild Owner: ${guild.owner.user.tag}\nNumber of Members: ${guild.memberCount}\nGuild Location: ${guild.region}\n\n`);
});


// Command Handler
client.on('message', (message) => {
  const prefix = '*';
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'meme') {
    meme(function(data) {
      const embed = new Discord.RichEmbed()
      .setTitle(data.title[0])
      .setImage(data.url[0])
      message.channel.send({embed});
    });
  };
});

client.login(process.env.BOT_TOKEN);
