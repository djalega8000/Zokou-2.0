const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "Général" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if (s.MODE != "oui") {
        mode = "privé";
    }
    
    var emoji = { "Général": "🌐", "Logo": "🎨", "Hentai": "🔥", "Weeb": "🌸", "Recherche": "🔍", "Conversion": "🌟", "Groupe": "♻️", "Autre": "🪖" };

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    const temps = moment(moment()).format("HH:MM:SS");
    moment.tz.setDefault('asia/karachi ').locale("id");
    const date = moment.tz("asia/karachi").format("DD/MM/YYYY");

  let infoMsg = `
╔════---------
║    Préfixe : ${s.PREFIXE}
║    Owner : ${s.NOM_OWNER}
║    Mode : ${mode}
║    Commandes : ${cm.length}
║    Date : ${date}
║    Heure : ${temps}
║    Mémoire : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
║    Plateforme : ${os.platform()}
║    Développeurs : Djalega++ 
║     & Luffy
╚════--------------- \n\n`;
    
    let menuMsg = `
👋 salut ${nomAuteurMessage} 👋
Je suis *${s.NOM_BOT}*, un bot développé par *La team Zokou*.
🔰 Mon préfixe : ${prefixe}
**Voici la liste de mes commandes :**
`;

    for (const cat in coms) {
        menuMsg += `
*━━━〈  ${cat} 〉━━━*`;
        for (const cmd of coms[cat]) {
            menuMsg += `
- ${cmd}`;
        }
    }

    menuMsg += `\n\n
🔰 Pour utiliser une commande, tapez "${prefixe}<nom de la commande>".
🔰 Fait avec node.js || Zokou_2.0-MD
`;

    var link = s.IMAGE_MENU;

    try {
        zk.sendMessage(dest, { image: { url: link }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
});
