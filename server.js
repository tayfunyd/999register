const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const commands = (client.commands = new Discord.Collection());
const aliases = (client.aliases = new Discord.Collection());

fs.readdirSync("./commands", { encoding: "utf8" })
  .filter(file => file.endsWith(".js"))
  .forEach(files => {
    let command = require(`./commands/${files}`);
    if (!command.name)
      return console.log(`Hatalı Kod Dosyası => [/commands/${files}]`);
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return;
    command.aliases.forEach(otherUses => {
      aliases.set(otherUses, command.name);
    });
  });

//  WATCHING  : !ping izliyor
//  LISTENING : !ping dinliyor
//  PLAYING   : !ping oynuyor
//  STREAMING : !ping yayında
////----------------------- READY KISMI -----------------------\\\\
client.on("ready", () => {
  client.user.setPresence({
    activity: { name: "🎄Developed by Shey🎄" },
    status: "idle"
  });
  client.channels.cache.get("802587896526929940").join(); // ses kanalı İD
  console.log(`Bot ${client.user.tag} Adı İle Giriş Yaptı!`);
});
////----------------------- CONFIG KISMI -----------------------\\\\
client.config = {
  vipRoles: ["801428394691788855"], //vip
  unregisteres: ["802222269588963328"], // kayıtsız
  maleRoles: ["802219877355356221"], // erkek
  girlroles: ["801428394683793459"], // bayan
  mods: ["801428394683793466"], // yetkili
  channelID: "801428394713284676", // kayıt kanalı
  yönetim: ["801428394713284670"] // üst yönetim
};
////----------------------- PREFİX KISMI -----------------------\\\\
client.on("message", message => {
  const prefix = "."; // prefix
  if (
    !message.guild ||
    message.author.bot ||
    !message.content.startsWith(prefix)
  )
    return;
  const args = message.content
    .slice(1)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));
  if (!cmd) return;
  cmd.run(client, message, args);
});
////----------------------- HEM ETİKET HEMDE TAG ROL KISMI -----------------------\\\\
client.on("userUpdate", async function(oldUser, newUser) {
  // kod codaredan alınıp editlenmiştir!
  const guildID = "801428394641326080"; //sunucu
  const roleID = "802613524995112981"; //taglırolü
  const tag = "⁹⁹⁹"; //tag
  const chat = "801428395505877064"; // chat
  const log2 = "801428397158563892"; // log kanalı

  const guild = client.guilds.cache.get(guildID);
  const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID);
  const member = guild.members.cache.get(newUser.id);
  const embed = new Discord.MessageEmbed()
    .setAuthor(member.displayName, member.user.avatarURL({ dynamic: true }))
    .setColor("#ff0000")
    .setTimestamp()
    .setFooter("🎄Developed by Niwren🎄");
  if (newUser.username !== oldUser.username) {
    if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
      member.roles.remove(roleID);
      client.channels.cache
        .get(log2)
        .send(
          embed.setDescription(
            ` ${newUser} isminden \`Rade\` çıakrtarak ailemizden ayrıldı!`
          )
        );
    } else if (
      !oldUser.username.includes(tag) &&
      newUser.username.includes(tag)
    ) {
      member.roles.add(roleID);
      client.channels.cache
        .get(chat)
        .send(
          `<a:gloria_totoyladanss:793106413223149588>Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${tag})`
        );
      client.channels.cache
        .get(log2)
        .send(
          embed.setDescription(
            `  ${newUser} ismine \`Rade\` alarak ailemize katıldı`
          )
        );
    }
  }
  if (newUser.discriminator !== oldUser.discriminator) {
    if (oldUser.discriminator == "0099" && newUser.discriminator !== "0099") {
      member.roles.remove(roleID);
      client.channels.cache
        .get(log2)
        .send(
          embed.setDescription(
            `  <@!' + newUser + '> etiketinden \`0099\` çıakrtarak ailemizden ayrıldı!`
          )
        );
    } else if (
      oldUser.discriminator !== "0099" &&
      newUser.discriminator == "0099"
    ) {
      member.roles.add(roleID);
      client.channels.cache
        .get(log2)
        .send(
          embed.setDescription(
            `  <@!' + newUser + '> etiketine \`0099\` alarak ailemize katıldı`
          )
        );
      client.channels.cache
        .get(chat)
        .send(
          `<a:wtf:802118868427866132> Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(#0099)`
        );
    }
  }
});

////----------------------- HOŞGELDİN MESAJI KISMI -----------------------\\\\
client.on("guildMemberAdd", member => {
  const mapping = {
    " ": "",
    "0": "", // sayı iDleri
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "5": "",
    "6": "",
    "7": "",
    "8": "",
    "9": ""
  };
  var toplamüye = member.guild.memberCount;
  var emotoplamüye = `${toplamüye}`
    .split("")
    .map(c => mapping[c] || c)
    .join("");
  let memberDay = Date.now() - member.user.createdTimestamp;
  let createAt = moment
    .duration(memberDay)
    .format("Y [Yıl], M [ay], W [hafta], DD [gün]");
  let createAt2 = moment
    .duration(memberDay)
    .format("DD [gün], HH [saat], mm [dakika]");
  if (memberDay > 604800000) {
    client.channels.cache.get(client.config.channelID)
      .send(` **Suncumuza hoşgeldin** ${member} - \`${member.id}\`

• <#801428395153293348> Kanalını okuduktan sonra Register odalarına girip teyit vermelisin!

•  \`⁹⁹⁹\` Tagımızı alarak  <@&801428394683793461> rolüne sahip olabilirsin! 

• Seninle birlikte **${emotoplamüye}** üyeye ulaştık

• Hesabın **${createAt}** önce açılmış

<@&801428394683793466>`);
  } else {
    client.channels.cache.get(registerChannel).send(
      new Discord.MessageEmbed()
        .setAuthor(
          member.user.username,
          member.user.avatarURL({ dynamic: true })
        )
        .setDescription(
          `${member}, Adlı Kullanıcı Sunucuya Katıldı Hesabı **${createAt2}** Önce Açıldığı İçin Şüpheli!`
        )
        .setTimestamp()
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setFooter(`🎄Developed by Shey🎄`)
    );
  }
});

////----------------------- TAG MESAJ KISMI -----------------------\\\\
client.on("message", msg => {
  if (msg.content === "!tag") {
    msg.channel.send(`⁹⁹⁹`); // tagı yazınız
  } else if (msg.content === "tag") {
    msg.channel.send(`⁹⁹⁹`); // tagı yazınız
  } else if (msg.content === ".tag") {
    msg.channel.send(`⁹⁹⁹`); // tagı yazınız
  } else if (msg.content === ".rol-ver") {
    msg.guild.members.cache.forEach(x => {
      x.roles.add("⁹⁹⁹");
    });
  }
});

////----------------------- TAG TARAMASI KISMI -----------------------\\\\
setInterval(() => {
  const server = client.guilds.cache.get("801428394641326080"); //Server ID
  server.members.cache.forEach(async member => {
    if (
      member.roles.cache.has("801428394691788855") ||
      member.roles.cache.has("801515748617879612")
    )
      return; //VİP&BOOSTER ROL İD

    /*   Yasaklı Tag    */
    if (member.user.username.includes("tasaklıTAG")) {
      member.roles.set(["Yasaklı Tag Rol ID"]).catch(() => {});
    }

    if (member.user.username.includes("tagı")) {
      await member.roles.add("taglı rolü").catch(() => {});
    }
    if (!member.user.username.includes("tag")) {
      await member.roles.set("kayıtsız rolü");
    }
  });
}, 60 * 1000); // 60(60 saniye) kısmını değiştirebilirsiniz

client.login("NzkxMDU0MTI4MDU4NTk3Mzc3.X-JkkQ.SdMml8UwkGTZ66G1imNPicP-SuM"); //token
