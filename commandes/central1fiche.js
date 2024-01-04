const { zokou } = require('../framework/zokou');
const { getR } = require('../bdd/central1fiche');

zokou(
  {
    nomCom: 'central1',
    categorie: 'NEOverse'
  },
  async (dest, zk, commandeOptions) => {
const { ms, repondre, arg } = commandeOptions;
    try{

     if(!arg || arg.lenght ===0) {
    const data = await getR();
    let mesg = `.*𝗖𝗘𝗡𝗧𝗥𝗔𝗟 𝗗𝗜𝗩𝗜𝗦𝗜𝗢𝗡🐯🟠*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *Pseudo👤*: Zinaya KÏNGS🇬🇳
◇ *Rang XP🔰*: ${data.r1}
◇ *Golds🧭*: ${data.r2}🧭
◇ *NEOcoins🔹*: ${data.r3}🔷
◇ *Gift Box🎁*: ${data.r4}🎁
◇ *Coupons🎟*: ${data.r5}🎟
◇ *NEO PASS🔸*: ${data.r6}🔸
░░░░░░░░░░░░░░
Note: ⭐⭐⭐⭐4/5
Records: ${data.r7} Victoires✅/ ${data.r8} Défaites❌
🏆Trophées: ${data.r9}     🌟TOS: ${data.r10}     💫Awards: ${data.r11}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: ${data.r12}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

◇ *Pseudo👤*: BADS🇨🇬
◇ *Rang XP🔰*: ${data.r13}
◇ *Golds🧭*: ${data.r14}🧭
◇ *NEOcoins🔹*: ${data.r15}🔷
◇ *Gift Box🎁*: ${data.r16}🎁
◇ *Coupons🎟*: ${data.r17}🎟
◇ *NEO PASS🔸*: ${data.r18}🔸
░░░░░░░░░░░░░░
Note: ⭐⭐⭐3/5
Records: ${data.r19} Victoires✅/ ${data.r20} Défaites❌
🏆Trophées: ${data.r21}     🌟TOS: ${data.r22}     💫Awards: ${data.r23}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: ${data.r24}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

◇ *Pseudo👤*: TEMPEST🇨🇲
◇ *Rang XP🔰*: ${data.r25}
◇ *Golds🧭*: ${data.r26}🧭
◇ *NEOcoins🔹*: ${data.r27}🔷
◇ *Gift Box🎁*: ${data.r28}🎁
◇ *Coupons🎟*: ${data.r29}🎟
◇ *NEO PASS🔸*: ${data.r30}🔸
░░░░░░░░░░░░░░
Note: ⭐1/5
Records: ${data.r31} Victoires✅/ ${data.r32} Défaites❌
🏆Trophées: ${data.r33}     🌟TOS: ${data.r34}     💫Awards: ${data.r35}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: ${data.r36}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
         *◁🔷𝗡𝗘𝗢 𝗙𝗢𝗥 𝗧𝗛𝗘 𝗣𝗟𝗔𝗬𝗘𝗥𝗦🎮➕ᐅᐭ*`;
zk.sendMessage(dest, { image: { url: 'https://i.imgur.com/H5FiyEQ.jpg' }, caption: mesg }, { quoted: ms });
  } else {
        const dbUrl = "postgresql://postgres:aga-B533E3BcGdfa5*cFf*4daE4*f*fB@monorail.proxy.rlwy.net:12102/railway";
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (arg[0] === 'joueur') {
          let joueur = arg[1];
          let object = arg[3];
          let signe = arg[4];
          let valeur = arg[5];

          let colonnesJoueur;

  switch (joueur) {
    case "Zinaya":
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
    case "Bads":
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
    case "Tempest":
      colonnesJoueur = {
        rang_xp: "r25",
        golds: "r26",
        neocoins: "r27",
        gift_box: "r28",
        coupons: "r29",
        neo_pass: "r30",
        victoires: "r31",
        defaites: "r32",
        trophees: "r33",
        tos: "r34",
        awards: "r35",
        cards: "r36",
      };
      break;
    default:
      console.log("Nom de joueur non reconnu.");
      return;
  }

          const colonneObjet = colonnesJoueur[object];

          if (colonneObjet) {
            await client.query(`UPDATE north4_fiche SET ${colonneObjet} = ${colonneObjet} ${signe} ${valeur} WHERE id = 1 `);
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

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
      repondre(`une erreur est survenue lors de la mise à jour des données du joueur ${joueur}`);
    }
  }
);
