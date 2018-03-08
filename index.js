const Discord = require("discord.js");


const client = new Discord.Client();


const auth = require("./auth.json");


const Music = require('discord.js-musicbot-addon');

var BOT_TOKEN = "NDE5NTIyMDc4Nzc4MDY0ODk2.DYMC-Q.35Qw5OUf_TzWf3CVwYYZqzYvPao"

client.on("ready", () => {

  console.log(`NixSystems Online`); 

  client.user.setGame(`NixSystems Online`,`https://www.twitch.tv/nixerlia` );
});

client.on("guildCreate", guild => {

  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);

});



const music = new Music(client, {

  youtubeKey: 'AIzaSyBBq6-Zbsq6V3PLsXCb7NCdS2TKgOoMAXQ',

  prefix: "-",

  global: false,

  anyoneCanAdjust: true,

  anyoneCanSkip: true,

  ownerOverMember: true,

  botOwner: "346596594147262466"

});

client.on("message", async message => {
	

	

  

  if(message.author.bot) return;
  

  if(message.content.indexOf(auth.prefix) !== 0) return;
  

  const args = message.content.slice(auth.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  
  if(command === "ping") {

    message.reply('Pong!');
  }
  
  if(command === "send") {
	      if(!message.member.roles.some(r=>["NixAdmin"].includes(r.name)) )
			return message.reply("ERROR : NixSystems detected that you do not have the NixAdmin role.");
		else{
			const sayMessage = args.join(" ");

			message.delete().catch(O_o=>{}); 

			message.channel.send({embed: {
				color: 3447003,
				description: sayMessage
}});
  }
  }
  

    
  
  if(command === "kick") {
 
    if(!message.member.roles.some(r=>["NixAdmin"].includes(r.name)) )
      return message.reply("ERROR : NixSystems detected that you do not have the NixAdmin role.");
    
  
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("ERROR : Either user was not mentioned or user is invalid.");
    if(!member.kickable) 
      return message.reply("ERROR : :no_entry: Nixerlia does not have permission to kick this user. ");
    

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("ERROR: You need a reason for the kick.");
    
  
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`NixSystems has kicked ${member.user.tag} \ Reason : ${reason}`);

  }
  
  if(command === "ban") {

    if(!message.member.roles.some(r=>["NixAdmin"].includes(r.name)) )
      return message.reply("ERROR : NixSystems detected that you do not have the NixAdmin role.");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("ERROR : Either user was not mentioned or user is invalid.");
    if(!member.bannable) 
      return message.reply("ERROR : :no_entry: Nixerlia does not have permission to ban this user.");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("ERROR : You need a reason for the ban.");
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`NixSystems has swung the ban hammer on ${member.user.tag} \ Reason : ${reason}`);
  }
  
  if(command === "purge") {
  
    
  
    const deleteCount = parseInt(args[0], 10);
    
 
    if(!deleteCount || deleteCount < 1 || deleteCount > 100)
      return message.reply("ERROR: Could not purge, please enter a value between 1 and 100.");
    
   
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
	if (command === "cmds"){
		message.channel.send({embed: {
		color: 2555151,
		description: "**|NixCMDS|** \n ---***General User Cmds***--- \n ◘ ping :exclamation:  \n ◘ getnix :smiley: \n ◘ die :boom::gun: \n ◘ birb :bird: \n  ◘ music [COMING SOON] :tools: \n  ---***Administrative Cmds***--- \n ◘ send :speech_balloon: \n ◘ kick :boot: \n ◘ ban :hammer: \n ◘ purge :toilet:"
}});
	}
	if (command === "getnix"){
		message.channel.send(`Click the link to invite me to your server ! https://discordapp.com/api/oauth2/authorize?client_id=419522078778064896&permissions=0&scope=bot`)
	}
	
	if(command==="sleep"){
		message.channel.send(`I am going to bed now! :zzz:`)
	}
	if(command==="die"){
		message.reply(`NO U  :boom::boom::gun:`)
	}
	if(command==="birb"){
		message.reply(`Heres a birb! : https://giphy.com/gifs/S5XAGNlolUoOQ `)
	}
	
	if(command==="eval"){
			const Developer = ["346596594147262466"]
	const defaultColor = ([62, 201, 143])
	const errorColor = ([42, 43, 45])
	const nopermColor = ([178, 10, 69])


	function clean(text) {
		if (typeof(text) === "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
		else
		return text;
	}
  
	if(Developer.some(id => message.author.id.includes(id))) {
		try {
		const code = args.join(" ");
		let evaled = eval(code);
		if (typeof evaled !== "string")
		evaled = require("util").inspect(evaled);
		const evalEmbed = new Discord.RichEmbed()
			.setColor([66, 244, 161])
			.setAuthor(`Nixerlia | Evaluation of Code`, client.user.avatarURL)
			.setDescription(evaled)
			.setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
		message.channel.send(evalEmbed)
		} catch (err) {
		const evalErrorEmbed = new Discord.RichEmbed()
			.setColor(errorColor)
			.setAuthor(`Nixerlia | Evaluation Fail`, client.user.avatarURL)
			.setTitle("Evaluation of code has failed!")
			.setDescription(clean(err))
			.setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
		message.channel.send(evalErrorEmbed)
		}
	} else {
		const embed = new Discord.RichEmbed()
			.setColor(nopermColor)
			.setAuthor(`Nixerlia`, client.user.avatarURL)
			.setTitle(`Sorry ${message.author.username}#${message.author.discriminator}`)
			.setDescription(`You do not have permission to use **Developer tools**!`)
			.setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
		message.channel.send(embed)
}
	}
	if(command==="help"){
		message.channel.send({embed: {
		color: 2555151,
		description: "Hello, and welcome to Nixerlia, I am a Discord.JS bot made by @crxl#4425 . \n To get started, check out my commands using the command, ``-cmds``. \n The prefix for all commands is ``-``. \n Have fun, and make sure to send others invite links using the ``-getnix`` command. \n Thank you. "
}});
    }

    
		
	
});

client.login(env.process.BOT_TOKEN);
           



