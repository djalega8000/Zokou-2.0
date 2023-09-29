const { zokou } = require("../framework/zokou");
const conf = require("../set");

zokou({ nomCom: "proprio", categorie: "Général", reaction: "💞" }, async (dest, zk, commandeOptions) => {
    const { ms , botpic } = commandeOptions;
    const vcard =
        'BEGIN:VCARD\n' + // metadata of the contact card
        'VERSION:3.0\n' +
        'FN:' + conf.NOM_OWNER + '\n' + // full name
        'ORG:undefined;\n' + // the organization of the contact
        'TEL;type=CELL;type=VOICE;waid=' + conf.NUMERO_OWNER + ':+' + conf.NUMERO_OWNER + '\n' + // WhatsApp ID + phone number
        'END:VCARD';
    zk.sendMessage(dest, {
        contacts: {
            displayName: conf.NOM_OWNER,
            contacts: [{ vcard }],
        },
    },{quoted:ms});
});

zokou({ nomCom: "dev", categorie: "Général", reaction: "💞" }, async (dest, zk, commandeOptions) => {
    const { ms, botpic } = commandeOptions;

    const devs = [
      { nom: "Djalega++", numero: "22559763447" },
      { nom: "᚛M๏𝓷keℽ D Lบffy᚜", numero: "22891733300" },
      // Ajoute d'autres développeurs ici avec leur nom et numéro
    ];

    let message = "👋 Bienvenue chez Zokou ! Voici les développeurs :\n\n";
    for (const dev of devs) {
      message += `----------------\n• ${dev.nom} : https://wa.me/${dev.numero}\n`;
    }
  var lien = botpic()
    if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:message }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:message }, { quoted: ms });
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

zokou({ nomCom: "support", categorie: "Général" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, auteurMessage, } = commandeOptions; 
 
  repondre("Veillez voir la discussion privé pour le lien svp ")
  await zk.sendMessage(auteurMessage,{text : `https://chat.whatsapp.com/H6oeuhfSMtV1Orjmf2NVnl`},{quoted :ms})

})

