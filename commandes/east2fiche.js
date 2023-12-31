const { zokou } = require('../framework/zokou');
const { getR } = require('../bdd/east2fiche');

zokou(
  {
    nomCom: 'east2',
    categorie: 'NEOverse'
  },
  async (dest, zk, commandeOptions) => {
    try {
const { ms, repondre, arg } = commandeOptions;
    const data = await getR();
      if(!arg || arg.length === 0) {
let mesg = ` .*𝗘𝗔𝗦𝗧 𝗗𝗜𝗩𝗜𝗦𝗜𝗢𝗡🦅🟢*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *Pseudo👤*: Hinata Hyuga 
◇ *Rang XP🔰*: ${data.r1}
◇ *Golds🧭*: ${data.r2}🧭
◇ *NEOcoins🔹*: ${data.r3}🔷
◇ *Gift Box🎁*: ${data.r4}🎁
◇ *Coupons🎟️*: ${data.r5}🎟️
◇ *NEO PASS🔸*: ${data.r6}🔸
░░░░░░░░░░░░░░
*Note*: ⭐1/5
*Records*: ${data.r7} Victoires✅/ ${data.r8} Défaites❌
*🏆Trophées*: ${data.r9} *🌟TOS*: ${data.r10} *💫Awards*: ${data.r11}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: ${data.r12}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

◇ *Pseudo👤*: Goldy Shogun 
◇ *Rang XP🔰*: ${data.r13}
◇ *Golds🧭*: ${data.r14}🧭
◇ *NEOcoins🔹*: ${data.r15}🔷
◇ *Gift Box🎁*: ${data.r16}🎁
◇ *Coupons🎟️*: ${data.r17}🎟️
◇ *NEO PASS🔸*: ${data.r18}🔸
░░░░░░░░░░░░░░
*Note*: ⭐⭐2/5
*Records*: ${data.r19} Victoires✅/ ${data.r20} Défaites❌
*🏆Trophées*: ${data.r21} *🌟TOS*: ${data.r22} *💫Awards*: ${data.r23}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: ${data.r24}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

◇ *Pseudo👤*: 
◇ *Rang XP🔰*: Joueur Classé🎮
◇ *Golds🧭*: 50.000🧭
◇ *NEOcoins🔹*: 0🔷
◇ *Gift Box🎁*: 0🎁
◇ *Coupons🎟️*: 0🎟️
◇ *NEO PASS🔸*: 0🔸
░░░░░░░░░░░░░░
*Note*: ⭐1/5
*Records*: 0 Victoires✅/ 0 Défaites❌
*🏆Trophées*: 0 *🌟TOS*: 0 *💫Awards*: 0
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
 *◁🔷𝗡𝗘𝗢 𝗙𝗢𝗥 𝗧𝗛𝗘 𝗣𝗟𝗔𝗬𝗘𝗥𝗦🎮➕ᐅᐭ*`;
 zk.sendMessage(dest, { image: { url: 'https://i.imgur.com/EashJkj.jpg' }, caption: mesg }, { quoted: ms });
                   } else {
    var dbUrl = "postgresql://postgres:aga-B533E3BcGdfa5*cFf*4daE4*f*fB@monorail.proxy.rlwy.net:12102/railway";
    const proConfig = {
      connectionString: dbUrl,
      ssl: {
        rejectUnauthorized: false,
      },
    };
    
    const { Pool } = require('pg');
    const pool = new Pool(proConfig);
        const ar = arg.join("");

const client = await pool.connect();
const baileys_1 = __importStar(require("@sampandey001/baileys"));
var mtype = (0, baileys_1.getContentType)(ms.message);
var texte = mtype == "conversation" ? ms.message.conversation: "";
        if(texte) {
  let joueur = texte[1];
  let object = texte[3];
  let signe = texte[4];
  let valeur = texte[5];
    
  let colonnesJoueur;

  switch (arg2) {
    case "Hinata":
      colonnesJoueur = {
        rang_xp: "r1",
        golds: "r2",
        neocoins: "r3",
        gift_box: "r4",
        coupons: "r5",
        neo_pass: "r6",
        victoires: "r7",
        defaites: "r8",
        trophees: "r9",
        tos: "r10",
        awards: "r11",
        cards: "r12",
      };
      break;
    case "Goldy":
      colonnesJoueur = {
        rang_xp: "r13",
        golds: "r14",
        neocoins: "r15",
        gift_box: "r16",
        coupons: "r17",
        neo_pass: "r18",
        victoires: "r19",
        defaites: "r20",
        trophees: "r21",
        tos: "r22",
        awards: "r23",
        cards: "r24",
      };
      break;
    default:
      console.log("Nom de joueur non reconnu.");
      return;
  }

    const colonneObjet = colonnesJoueur[object];

  if (colonneObjet) {
      await client.query(`UPDATE tex_fiche SET ${colonneObjet} = ${colonneObjet} ${signe} $1 WHERE id = 1`, [valeur]);
      console.log(`Données de l'utilisateur ${joueur} mises à jour`);
      repondre(`Données du joueur ${joueur} mises à jour`);
  } else {
    console.log("Nom d'objet non reconnu.");
    repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
  }
} else {
  console.log("Le message ne correspond pas au format attendu.");
  repondre(`Le format du message est incorrect.`);
}
}
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    repondre(`une erreur est survenu lors de la mise a jouer des données du jouer ${joueur}`);
  } finally {
          var dbUrl = "postgresql://postgres:aga-B533E3BcGdfa5*cFf*4daE4*f*fB@monorail.proxy.rlwy.net:12102/railway";
    const proConfig = {
      connectionString: dbUrl,
      ssl: {
        rejectUnauthorized: false,
      },
    };
    
    const { Pool } = require('pg');
    const pool = new Pool(proConfig);

    const client = await pool.connect();
    client.release();
  }
});
