const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "Général" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,botpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if (s.MODE != "oui") {
        mode = "privé";
    }
    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    const temps = moment(moment()).format("HH:MM:SS");
    moment.tz.setDefault('asia/karachi ').locale("id");
    const date = moment.tz("asia/karachi").format("DD/MM/YYYY");

  let infoMsg = `╔═════ஜ۩۞۩ஜ═══╗
║📌 *Préfixe* -> ${s.PREFIXE}
║📌 *Owner* -> ${s.NOM_OWNER}
║📌 *Mode* -> ${mode}
║📌 *Commandes* -> ${cm.length}
║📌 *Date* -> ${date}
║📌 *Heure* -> ${temps}
║📌 *Mémoire* -> ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
║📌 *Plateforme* -> ${os.platform()}
║📌 *Développeurs* -> Djalega++ 
║ & ᚛M๏𝓷keℽ D Lบffy᚜
╚═════ஜ۩۞۩ஜ═══╝\n\n`;
    
    let menuMsg = `*👋 salut ${nomAuteurMessage} 👋*
Je me nomme *${s.NOM_BOT}*, un bot développé par *La team Zokou*.

*Voici la liste de mes commandes :*
\n`;

    for (const cat in coms) {
        menuMsg += `*╚»★«╝${cat}╚»★«╝*\n`;
        for (const cmd of coms[cat]) {
            menuMsg += `🔹 ${prefixe}${cmd}\n`;
        }
    }

    menuMsg += `\n➖➖➖➖➖➖➖➖➖
✔️  *Pour utiliser une commande, tapez "${prefixe}<nom de la commande>"*.
✔️  *Fait avec node.js || Zokou_2.0-MD*
`;

   var lien = botpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    repondre(lien)
    repondre("Le lien ne se termine ni par .mp4 ou .gif ni par .jpeg , jpg ou .png");
    
}

});
