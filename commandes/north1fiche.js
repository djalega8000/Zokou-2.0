const { zokou } = require('../framework/zokou');
const { getR } = require('../bdd/north1fiche');

zokou(
  {
    nomCom: 'north1',
    categorie: 'NEOverse'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;

    try {
      const data = await getData();
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];

      if (!arg || arg.length === 0) {
        let mesg = `.*𝗡𝗢𝗥𝗧𝗛 𝗗𝗜𝗩𝗜𝗦𝗜𝗢𝗡🐺🔴*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *Pseudo👤*: Lily KÏNGS🇨🇬
◇ *Rang XP🔰*: ${data.r1}
◇ *Golds🧭*: ${data.r2}🧭
◇ *NEOcoins🔹*: ${data.r3}🔷
◇ *Gift Box🎁*: ${data.r4}🎁
◇ *Coupons🎟*: ${data.r5}🎟
◇ *NEO PASS🔸*: ${data.r6}🔸
░░░░░░░░░░░░░░
Note: ⭐⭐⭐⭐⭐5.5/5
Records: ${data.r7} Victoires✅/ ${data.r8} Défaites❌
🏆Trophées: ${data.r9}     🌟TOS: ${data.r10}     💫Awards: ${data.r11}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: ${data.r12}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

◇ *Pseudo👤*: Damian KÏNGS🇨🇬
◇ *Rang XP🔰*: ${data.r13}
◇ *Golds🧭*: ${data.r14}🧭
◇ *NEOcoins🔹*: ${data.r15}🔷
◇ *Gift Box🎁*: ${data.r16}🎁
◇ *Coupons🎟*: ${data.r17}🎟
◇ *NEO PASS🔸*: ${data.r18}🔸
░░░░░░░░░░░░░░
Note: ⭐⭐⭐⭐⭐5.5/5
Records: ${data.r19} Victoires✅/ ${data.r20} Défaites❌
🏆Trophées: ${data.r21}     🌟TOS: ${data.r22}     💫Awards: ${data.r23}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: ${data.r24}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

◇ *Pseudo👤*: 
◇ *Rang XP🔰*: Joueur Classé🎮
◇ *Golds🧭*: 50.000🧭
◇ *NEOcoins🔹*: 0🔷
◇ *Gift Box🎁*: 0🎁
◇ *Coupons🎟*: 0🎟
◇ *NEO PASS🔸*: 0🔸
░░░░░░░░░░░░░░
Note: ⭐1/5
Records: 0 Victoires✅/ 0 Défaites❌
🏆Trophées: 0     🌟TOS: 0     💫Awards: 0
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
         *◁🔷𝗡𝗘𝗢 𝗙𝗢𝗥 𝗧𝗛𝗘 𝗣𝗟𝗔𝗬𝗘𝗥𝗦🎮➕ᐅᐭ*`;
        zk.sendMessage(dest, { image: { url: 'https://i.imgur.com/UP1ubll.jpg' }, caption: mesg }, { quoted: ms });
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

        if (arg[0] === 'joueur:') {
          let colonnesJoueur;

          switch (joueur) {
            case "lily":
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
            case "damian":
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
              repondre(`joueur: ${joueur} non reconnu`);
              return; 
          }

          const colonneObjet = colonnesJoueur[object];

          if (colonneObjet && (signe === '+' || signe === '-')) {
            const query = `UPDATE north4_he SET ${colonneObjet} = ${colonneObjet} ${signe} ${valeur} WHERE id = 1`;
            await client.query(query);

            console.log(`Données de l'utilisateur ${joueur} mises à jour`);
            repondre(`Données du joueur mises à jour\n👤*JOUEUR*: ${joueur}\n⚙*OBJECT*: ${object}\n💵*VALEUR*: ${signe}${valeur}\n*NOUVEAU SOLDE*: ${data[colonneObjet]}`);
          } else {
            console.log("Nom d'objet non reconnu ou signe invalide.");
            repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
          }
        } else {
          console.log("Le message ne correspond pas au format attendu.");
          repondre(`Le format du message est incorrect.`);
        }

        if (signe === '=') {
          const query = `UPDATE north4_he SET ${colonneObjet} = ${valeur} WHERE id = 1`;
          await client.query(query);

          console.log(`données du joueur: ${joueur} mise a jour`);
          repondre(`Données du joueur mises à jour\n👤*JOUEUR*: ${joueur}\n⚙*OBJECT*: ${object}\n💵*VALEUR*: ${valeur}\n*NOUVELLE CARDS/RANG_XP*: ${data[colonneObjet]}`);
        }

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
      repondre("Une erreur s'est produite");
    }
  }
);
