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

    let mesg = `*NEOverse Rp Gaming*
    .𝐍𝐎𝐑𝐓H 𝐃𝐈𝐕𝐈𝐒𝐈𝐎𝐍🐺🔴 1
    ░░░░░░░░░░░░░░░░░░░
    ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    ◇ *𝐉𝐨𝐮𝐞𝐮𝐫👤*: Lily KÏNGS II
    ◇ *𝐅𝐚𝐧𝐬👥*: ${data.r1}👥
    ◇ *𝐒𝐭𝐚𝐭𝐮𝐭*: ${data.r2}
    ◇ *𝐆𝐨𝐥𝐝𝐬🧭*: ${data.r3}🧭
    ◇ *𝐍𝐄𝐎𝐜𝐨𝐢𝐧𝐬🔹*: ${data.r4}🔹
    ◇ *𝐆𝐢𝐟𝐭 𝐁𝐨𝐱🎁*: ${data.r5}🎁
    ◇ *𝐂𝐨𝐮𝐩𝐨𝐧𝐬🎟️*: ${data.r6}🎟️
    ◇ *NEO PASS🎫*: ${data.r7}🔸
    ░░░░░░░░░░░░░░
    ═══════════
    *𝐍𝐨𝐭𝐞*: ⭐⭐⭐⭐⭐ 5.5/5
    *𝐑𝐞𝐜𝐨𝐫𝐝*: ${data.r8} Victoires / ${data.r9} Défaites
    *🏆𝐓𝐫𝐨𝐩𝐡𝐞́𝐞𝐬*: ${data.r10} 🌟𝐓𝐎𝐒: ${data.r11} *💫𝐀𝐰𝐚𝐫𝐝𝐬*: ${data.r12}
    ░░░░░░░░░░░░░░░░░░░
    ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    *🎴Cards(15 max)*: ${data.r13}
    ░░░░░░░░░░░░░░░░░░░
    ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    ◇ *𝐉𝐨𝐮𝐞𝐮𝐫👤*: Damian KÏNGS III
    ◇ *𝐅𝐚𝐧𝐬👥*: ${data.r14}👥 
    ◇ *𝐒𝐭𝐚𝐭𝐮𝐭*: ${data.r15}
    ◇ *𝐆𝐨𝐥𝐝𝐬🧭*: ${data.r16}🧭
    ◇ *𝐍𝐄𝐎𝐜𝐨𝐢𝐧𝐬🔹*: ${data.r17}🔹
    ◇ *𝐆𝐢𝐟𝐭 𝐁𝐨𝐱🎁*: ${data.r18}🎁
    ◇ *𝐂𝐨𝐮𝐩𝐨𝐧𝐬🎟️*: ${data.r19}🎟️
    ◇ *NEO PASS🎫*: ${data.r20}🔸
    ░░░░░░░░░░░░░░
    ═══════════
    *𝐍𝐨𝐭𝐞*: ⭐⭐⭐⭐⭐ 5.5/5
    *𝐑𝐞𝐜𝐨𝐫𝐝*: ${data.r21} Victoires / ${data.r22} Défaites
    *🏆𝐓𝐫𝐨𝐩𝐡𝐞́𝐞𝐬*: ${data.r23} 🌟𝐓𝐎𝐒: ${data.r24} *💫𝐀𝐰𝐚𝐫𝐝𝐬*: ${data.r25}
    ░░░░░░░░░░░░░░░░░░░
    ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    *🎴Cards(15 max)*: ${data.r26}
    ░░░░░░░░░░░░░░░░░░░
    ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    ◇ *𝐉𝐨𝐮𝐞𝐮𝐫👤*: Kanzen Gold King
    ◇ *𝐅𝐚𝐧𝐬👥*: ${data.r27}👥
    ◇ *𝐒𝐭𝐚𝐭𝐮𝐭*: ${data.r28}
    ◇ *𝐆𝐨𝐥𝐝𝐬🧭*: ${data.r29}🧭
    ◇ *𝐍𝐄𝐎𝐜𝐨𝐢𝐧𝐬🔹*: ${data.r30}🔹
    ◇ *𝐆𝐢𝐟𝐭 𝐁𝐨𝐱🎁*: ${data.r31}🎁
    ◇ *𝐂𝐨𝐮𝐩𝐨𝐧𝐬🎟️*: ${data.r32}🎟️
    ◇ *NEO PASS🎫*: ${data.r33}🔸
    ░░░░░░░░░░░░░░
    ═══════════
    *𝐍𝐨𝐭𝐞*: ⭐⭐⭐3.5/5
    *𝐑𝐞𝐜𝐨𝐫𝐝*: ${data.r34} Victoires / ${data.r35} Défaites
    *🏆𝐓𝐫𝐨𝐩𝐡𝐞́𝐞𝐬*: ${data.r36}, 🌟𝐓𝐎𝐒: ${data.r37} *💫𝐀𝐰𝐚𝐫𝐝𝐬*: ${data.r38}
    ░░░░░░░░░░░░░░░░░░░
    ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    *🎴Cards(15 max)*: ${data.r39}
    ░░░░░░░░░░░░░░░░░░░
    ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
     *🔷𝗡𝗘𝗢 𝗡𝗘𝗫𝗧 𝗚𝗔𝗠𝗘®🎮*`;

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

        if(msg) {
    
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
