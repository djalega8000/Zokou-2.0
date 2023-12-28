const { zokou } = require('../framework/zokou');
const { getR } = require('../bdd/fiche');

zokou(
  {
    nomCom: 'north1',
    categorie: 'NEOverse'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    try {

    const data = await getR();

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
    const msg = /JOUER: (\w+) actualise (\w+) \+\/- (\d+)/;
    const msgMatch = msg.match;

if (msgMatch) {
  const joueur = msgMatch[1];
  const object = msgMatch[2];
  const valeur = parseInt(msgMatch[3]);

  let colonnesJoueur;

  switch (joueur) {
    case "Lily":
      colonnesJoueur = {
        Fans: "r1",
        statut: "r2",
        Gold: "r3",
        NEOcoins: "r4",
        Gift_Box: "r5",
        Coupons: "r6",
        NEO_PASS: "r7",
        victoires: "r8",
        Defaites: "r9",
        Trophees: "r10",
        Tos: "r11",
        Awards: "r12",
        cards: "r13",
      };
      break;
    case "DAMIEN":
      colonnesJoueur = {
        Fans: "r14",
        statut: "r15",
        Gold: "r16",
        NEOcoins: "r17",
        Gift_Box: "r18",
        Coupons: "r19",
        NEO_PASS: "r20",
        victoires: "r21",
        Defaites: "r22",
        Trophees: "r23",
        Tos: "r24",
        Awards: "r25",
        cards: "r26",
      };
      break;
    case "Kanzen":
      colonnesJoueur = {
        Fans: "r27",
        statut: "r28",
        Gold: "r29",
        NEOcoins: "r30",
        Gift_Box: "r31",
        Coupons: "r32",
        NEO_PASS: "r33",
        victoires: "r34",
        Defaites: "r35",
        Trophees: "r36",
        Tos: "r37",
        Awards: "r38",
        cards: "r39",
      };
      break;
    default:
      console.log("Nom de joueur non reconnu.");
      return;
  }

  const colonneObjet = colonnesJoueur[object];

  if (colonneObjet) {
    await client.query(`UPDATE texte_fiche SET ${colonneObjet} = ${colonneObjet} + $1`, [valeur]);
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
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    repondre(`une erreur est survenu lors de la mise a jouer des données du jouer ${jouer}`);
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
