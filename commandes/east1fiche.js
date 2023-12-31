const { zokou } = require('../framework/zokou');
const { getR } = require('../bdd/fiche');

zokou(
  {
    nomCom: 'north1',
    categorie: 'NEOverse'
  },
  async (dest, zk, commandeOptions) => {
    try {
const { ms, repondre, arg } = commandeOptions;
    const data = await getR();
      if(!arg || arg.length === 0) {
let mesg = ` . 𝗘𝗔𝗦𝗧 𝗗𝗜𝗩𝗜𝗦𝗜𝗢𝗡🦅🟢
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *Pseudo👤*: Atsushi KÏNGS🇨🇲 
◇ *Rang XP🔰*: ${r1}
◇ *Golds🧭*: ${r2}🧭
◇ *NEOcoins🔹*: 13🔷
◇ *Gift Box🎁*: 0🎁
◇ *Coupons🎟️*: 0🎟️
◇ *NEO PASS🔸*: 0🔸
░░░░░░░░░░░░░░
*Note*: ⭐1/5
*Records*: 25 Victoires✅/ 67 Défaites❌
*🏆Trophées*: 0 *🌟TOS*: 0 *💫Awards*: 0
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: Borushiki 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

◇ *Pseudo👤*: White KÏNGS🇨🇮 
◇ *Rang XP🔰*: *SUPERSTAR💫*: Grade A
◇ *Golds🧭*: 2.025.000🧭
◇ *NEOcoins🔹*: 30🔷
◇ *Gift Box🎁*: 1🎁
◇ *Coupons🎟️*: 0🎟️
◇ *NEO PASS🔸*: 0🔸
░░░░░░░░░░░░░░
*Note*: ⭐⭐⭐⭐4/5
*Records*: 62 Victoires✅/ 30 Défaites❌
*🏆Trophées*: 1 *🌟TOS*: 2 *💫Awards*: 0
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: Sukuna, Saitama. 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

◇ *Pseudo👤*: Kemael🇨🇮
◇ *Rang XP🔰*: Joueur Classé🎮
◇ *Golds🧭*: 130.000🧭
◇ *NEOcoins🔹*: 3🔷
◇ *Gift Box🎁*: 1🎁
◇ *Coupons🎟️*: 100🎟️
◇ *NEO PASS🔸*: 0🔸
░░░░░░░░░░░░░░
*Note*: ⭐⭐2.5/5
*Records*: 17 Victoires✅/ 6 Défaites❌
*🏆Trophées*: 1 *🌟TOS*: 1 *💫Awards*: 0
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: Itadori, Natsu, Goku(début), Goku SSJ2
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
 *◁🔷𝗡𝗘𝗢 𝗙𝗢𝗥 𝗧𝗛𝗘 𝗣𝗟𝗔𝗬𝗘𝗥𝗦🎮➕ᐅᐭ*`;
 zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/38659f7aeacb8cc83fe99.jpg' }, caption: mesg }, { quoted: ms });
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
    case "Lily":
      colonnesJoueur = {
        fans: "r1",
        statut: "r2",
        gold: "r3",
        neocoins: "r4",
        gift_box: "r5",
        Coupons: "r6",
        neo_pass: "r7",
        victoires: "r8",
        defaites: "r9",
        trophees: "r10",
        tos: "r11",
        awards: "r12",
        cards: "r13",
      };
      break;
    case "DAMIEN":
      colonnesJoueur = {
        fans: "r14",
        statut: "r15",
        gold: "r16",
        neocoins: "r17",
        gift_box: "r18",
        coupons: "r19",
        neo_pass: "r20",
        victoires: "r21",
        defaites: "r22",
        trophees: "r23",
        tos: "r24",
        awards: "r25",
        cards: "r26",
      };
      break;
    case "Kanzen":
      colonnesJoueur = {
        fans: "r27",
        statut: "r28",
        gold: "r29",
        neocoins: "r30",
        gift_box: "r31",
        coupons: "r32",
        neo_pass: "r33",
        victoires: "r34",
        defaites: "r35",
        trophees: "r36",
        tos: "r37",
        awards: "r38",
        cards: "r39",
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
