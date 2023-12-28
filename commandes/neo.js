const { zokou } = require('../framework/zokou');
const { getR } = require('../bdd/fiche');

zokou(
  {
    nomCom: 'north1',
    categorie: 'NEOverse'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre } = commandeOptions;
    
        const data = getR();

        let msg = `*NEOverse Rp Gaming*
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
◇ *𝐅𝐚𝐧𝐬👥*: ${data.R14}👥 
◇ *𝐒𝐭𝐚𝐭𝐮𝐭*: ${data.R15}
◇ *𝐆𝐨𝐥𝐝𝐬🧭*: ${data.R16}🧭
◇ *𝐍𝐄𝐎𝐜𝐨𝐢𝐧𝐬🔹*: ${data.R17}🔹
◇ *𝐆𝐢𝐟𝐭 𝐁𝐨𝐱🎁*: ${data.R18}🎁
◇ *𝐂𝐨𝐮𝐩𝐨𝐧𝐬🎟️*: ${data.R19}🎟️
◇ *NEO PASS🎫*: ${data.R20}🔸
░░░░░░░░░░░░░░
═══════════
*𝐍𝐨𝐭𝐞*: ⭐⭐⭐⭐⭐ 5.5/5
*𝐑𝐞𝐜𝐨𝐫𝐝*: ${data.R21} Victoires / ${data.R22} Défaites
*🏆𝐓𝐫𝐨𝐩𝐡𝐞́𝐞𝐬*: ${data.R23} 🌟𝐓𝐎𝐒: ${data.R24} *💫𝐀𝐰𝐚𝐫𝐝𝐬*: ${data.R25}
░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: ${data.R26}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *𝐉𝐨𝐮𝐞𝐮𝐫👤*: Kanzen Gold King
◇ *𝐅𝐚𝐧𝐬👥*: ${data.R27}👥
◇ *𝐒𝐭𝐚𝐭𝐮𝐭*: ${data.R28}
◇ *𝐆𝐨𝐥𝐝𝐬🧭*: ${data.R29}🧭
◇ *𝐍𝐄𝐎𝐜𝐨𝐢𝐧𝐬🔹*: ${data.R30}🔹
◇ *𝐆𝐢𝐟𝐭 𝐁𝐨𝐱🎁*: ${data.R31}🎁
◇ *𝐂𝐨𝐮𝐩𝐨𝐧𝐬🎟️*: ${data.R32}🎟️
◇ *NEO PASS🎫*: ${data.R33}🔸
░░░░░░░░░░░░░░
═══════════
*𝐍𝐨𝐭𝐞*: ⭐⭐⭐3.5/5
*𝐑𝐞𝐜𝐨𝐫𝐝*: ${data.R34} Victoires / ${data.R35} Défaites
*🏆𝐓𝐫𝐨𝐩𝐡𝐞́𝐞𝐬*: ${data.R36}, 🌟𝐓𝐎𝐒: ${data.R37} *💫𝐀𝐰𝐚𝐫𝐝𝐬*: ${data.R38}
░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: ${data.R39}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
 *🔷𝗡𝗘𝗢 𝗡𝗘𝗫𝗧 𝗚𝗔𝗠𝗘®🎮*`;

        zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/38659f7aeacb8cc83fe99.jpg' }, caption: msg }, { quoted: ms})

  const client = await pool.connect();
  const msg = /JOUER: (\w+) actualise (\w+) \+\/- (\d+)/;

    if (msg)  try {
      const match = msg.match
      if (match) {
        const joueur = match[1];
        const object = match[2];
        const valeur = parseInt(match[3]);

        let colonnesJoueur;

        switch (joueur) {
          case "Lily":
            colonnesJoueur = {
              Fans: "R1",
              statut: "R2",
              Gold: "R3",
              NEOcoins: "R4",
              Gift_Box: "R5",
              Coupons: "R6",
              NEO_PASS: "R7",
              victoires: "R8",
              Defaites: "R9",
              Trophees: "R10",
              Tos: "R11",
              Awards: "R12",
              cards: "R13",
            };
            break;
          case "DAMIEN":
            colonnesJoueur = {
              Fans: "R14",
              statut: "R15",
              Gold: "R16",
              NEOcoins: "R17",
              Gift_Box: "R18",
              Coupons: "R19",
              NEO_PASS: "R20",
              victoires: "R21",
              Defaites: "R22",
              Trophees: "R23",
              Tos: "R24",
              Awards: "R25",
              cards: "R26",
            };
            break;
          case "Kanzen":
            colonnesJoueur = {
              Fans: "R27",
              statut: "R28",
              Gold: "R29",
              NEOcoins: "R30",
              Gift_Box: "R31",
              Coupons: "R32",
              NEO_PASS: "R33",
              victoires: "R34",
              Defaites: "R35",
              Trophees: "R36",
              Tos: "R37",
              Awards: "R38",
              cards: "R39",
            };
            break;
          default:
            console.log("Nom de joueur non reconnu.");
            return;
        }

        const colonneObjet = colonnesJoueur[object];

        if (colonneObjet) {
          await client.query(`UPDATE users_fiche SET ${colonneObjet} = ${colonneObjet} + $1`, [valeur]);
          console.log(`Données de l'utilisateur ${joueur} mises à jour`);
          repondre(`Donnees du jouer ${jouer} mises a jour`)
        } else {
          console.log("Nom d'objet non reconnu.");
          repondre(`une erreur est survenu entrer correctement les donnes`);
        }
      } else {
        console.log("Le message ne correspond pas au format attendu.");
        repobdre(`le format du message est incorrecte`);
      }
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
  repondre(`une erreyr est survenulor s de la mise a jouer des donner du jouer ${jouer}`);
  } finally {
    client.release();
  }
}


    
   });

