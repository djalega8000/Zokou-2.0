const { zokou } = require('../framework/zokou');
const { addOrUpdateDataInNeo, getDataFromNeo } = require('../bdd/neo');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou(
  {
    nomCom: 'north1',
    categorie: 'NEOverse'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre, superUser } = commandeOptions;

    const data = addOrUpdateUserData

    
    
          moment.tz.setDefault('Etc/GMT');

          // Créer une date et une heure en GMT
          const temps = moment().format('HH:mm:ss');
          const date = moment().format('DD/MM/YYYY');

    let msg = `*NEOverse Rp Gaming*
          *Date* : ${date}
          *Heure* :${temps}
          .𝐍𝐎𝐑𝐓H 𝐃𝐈𝐕𝐈𝐒𝐈𝐎𝐍🐺🔴 1
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *𝐉𝐨𝐮𝐞𝐮𝐫👤*: Lily KÏNGS II
◇ *𝐅𝐚𝐧𝐬👥*: ${data.R1}👥
◇ *𝐒𝐭𝐚𝐭𝐮𝐭*: ${data.R2}
◇ *𝐆𝐨𝐥𝐝𝐬🧭*: ${data.R3}🧭
◇ *𝐍𝐄𝐎𝐜𝐨𝐢𝐧𝐬🔹*: ${data.R4}🔹
◇ *𝐆𝐢𝐟𝐭 𝐁𝐨𝐱🎁*: ${data.R5}🎁
◇ *𝐂𝐨𝐮𝐩𝐨𝐧𝐬🎟️*: ${data.R6}🎟️
◇ *NEO PASS🎫*: ${data.R7}🔸
░░░░░░░░░░░░░░
═══════════
*𝐍𝐨𝐭𝐞*: ⭐⭐⭐⭐⭐ 5.5/5
*𝐑𝐞𝐜𝐨𝐫𝐝*: ${data.R8} Victoires / ${data.R9} Défaites
*🏆𝐓𝐫𝐨𝐩𝐡𝐞́𝐞𝐬*: ${data.R10} 🌟𝐓𝐎𝐒: ${data.R11} *💫𝐀𝐰𝐚𝐫𝐝𝐬*: ${data.R12}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: ${data.R13}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *𝐉𝐨𝐮𝐞𝐮𝐫👤*: Damian KÏNGS III
◇ *𝐅𝐚𝐧𝐬👥*: 1.200.000👥 
◇ *𝐒𝐭𝐚𝐭𝐮𝐭*: *🔱Légende*: Grade S
◇ *𝐆𝐨𝐥𝐝𝐬🧭*: 1.560.000🧭
◇ *𝐍𝐄𝐎𝐜𝐨𝐢𝐧𝐬🔹*: 10🔹
◇ *𝐆𝐢𝐟𝐭 𝐁𝐨𝐱🎁*: 1🎁
◇ *𝐂𝐨𝐮𝐩𝐨𝐧𝐬🎟️*: 100🎟️
◇ *NEO PASS🎫*: 0🔸
░░░░░░░░░░░░░░
═══════════
*𝐍𝐨𝐭𝐞*: ⭐⭐⭐⭐⭐ 5.5/5
*𝐑𝐞𝐜𝐨𝐫𝐝*: 87 Victoires / 0 Défaites
*🏆𝐓𝐫𝐨𝐩𝐡𝐞́𝐞𝐬*: 4 🌟𝐓𝐎𝐒: 3 *💫𝐀𝐰𝐚𝐫𝐝𝐬*: 3
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: Kagaho, Kilua, C17(DBZ), Sukuna, Daemon, Gohan Beast, Sukuna (Heian Era), Kashimo, Indra, Sasori 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *𝐉𝐨𝐮𝐞𝐮𝐫👤*: Kanzen Gold King
◇ *𝐅𝐚𝐧𝐬👥*: 310.000👥
◇ *𝐒𝐭𝐚𝐭𝐮𝐭*: *⭐Star* Grade C
◇ *𝐆𝐨𝐥𝐝𝐬🧭*: 880.000🧭
◇ *𝐍𝐄𝐎𝐜𝐨𝐢𝐧𝐬🔹*: 1🔹
◇ *𝐆𝐢𝐟𝐭 𝐁𝐨𝐱🎁*: 1🎁
◇ *𝐂𝐨𝐮𝐩𝐨𝐧𝐬🎟️*: 50🎟️
◇ *NEO PASS🎫*: 0🔸
░░░░░░░░░░░░░░
═══════════
*𝐍𝐨𝐭𝐞*: ⭐⭐⭐3.5/5
*𝐑𝐞𝐜𝐨𝐫𝐝*: 25 Victoires / 7 Défaites
*🏆𝐓𝐫𝐨𝐩𝐡𝐞́𝐞𝐬*: 0, 🌟𝐓𝐎𝐒: 3 *💫𝐀𝐰𝐚𝐫𝐝𝐬*: 0
░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: C17
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
 *🔷𝗡𝗘𝗢 𝗡𝗘𝗫𝗧 𝗚𝗔𝗠𝗘®🎮*`

    zk.sendMessage( dest, image { url : {''} caption: msg }, {quoted: ms})



  try {
      if (arg && arg.length > 0) {
        // Vérifiez si le message est de type "Jouer👥 : Lily KÏNGS II: actualisé gold +10000🧭"
        const regex = /^Jouer👥 : (.+): actualisé gold ([+-]?\d+)🧭$/i;
        const match = arg.join(' ').match(regex);

        if (match) {
          const playerName = match[1].toLowerCase().replace(/\s+/g, ''); // Normalisez le nom du joueur
          const modificationGold = parseInt(match[2]); // Obtenez la modification de l'or

          // Obtenez les données actuelles du joueur
          const playerData = await getDataFromNeo(`joueur_${playerName}`);

          // Ajoutez ou soustrayez l'or en fonction de la modification
          const nouvellesGold = (playerData && playerData.gold) ? playerData.gold + modificationGold : modificationGold;

          // Mettez à jour les données du joueur dans la base de données
          await addOrUpdateDataInNeo(`joueur_${playerName}`, { gold: nouvellesGold });

          // Répondez pour informer que les informations ont été mises à jour
          repondre(`Les informations du joueur ${playerName} ont été mises à jour. Nouveau total de Gold : ${nouvellesGold}`);
          return;
        }
      }

      // Si ce n'est pas une mise à jour spécifique, continuez avec le reste du code
      const data = await getDataFromNeo();

      if (!arg || !arg[0] || arg.join('') === '') {

        if (data) {
          const { message, lien } = data;

          var mode = "public";
          if (s.MODE !== "oui") {
            mode = "privé";
          }

          moment.tz.setDefault('Etc/GMT');

          // Créer une date et une heure en GMT
          const temps = moment().format('HH:mm:ss');
          const date = moment().format('DD/MM/YYYY');

          const neomsg = `
          *NEOverse Rp Gaming*
          *Date* : ${date}
          *Heure* : ${temps}
          ${message}`;

          if (lien.match(/\.(mp4|gif)$/i)) {
            try {
              zk.sendMessage(dest, { video: { url: lien }, caption: neomsg }, { quoted: ms });
            } catch (e) {
              console.error("Erreur lors de l'envoi du message vidéo/gif :", e);
              repondre("Une erreur s'est produite lors de l'envoi du message vidéo/gif.");
            }
          }
          // Vérification pour .jpeg ou .png
          else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            try {
              zk.sendMessage(dest, { image: { url: lien }, caption: neomsg }, { quoted: ms });
            } catch (e) {
              console.error("Erreur lors de l'envoi du message image :", e);
              repondre("Une erreur s'est produite lors de l'envoi du message image.");
            }
          }
          else {
            repondre(neomsg);
          }

        } else {
          if (!superUser) { repondre("il n'y a pas de fiche north1 enregistrée "); return };

          await repondre("Vous n'avez pas encore enregistré la fiche north1. Pour ce faire, tapez entrez après north1 votre message et votre lien image ou vidéo dans ce format : /north1 message;lien");
          repondre("Veuillez me contacter pour plus amples explications.");
        }
      } else {

        if (!superUser) { repondre("Seuls les membres de la NS ont le droit de modifier la Fiche North1"); return };

        const texte = arg.join(' ').split(';')[0];
        const tlien = arg.join(' ').split(';')[1];

        await addOrUpdateDataInNeo(texte, tlien);
        repondre('Fiche North1 actualisée avec succès');
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
      repondre("Une erreur s'est produite lors du traitement de la commande.");
    }
  }
);

