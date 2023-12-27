// Importez dotenv et chargez les variables d'environnement depuis le fichier .env
require("dotenv").config();

const { Pool } = require("pg");

// Récupérez l'URL de la base de données de la variable s.DATABASE_URL
var dbUrl = "postgres://neoverse_user:e4Ts4KmggWvcvG3K2ijj9Cu2OciBJLff@dpg-ckrsaafd47qs73b2kt40-a.oregon-postgres.render.com/neoverse";
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Créez une pool de connexions PostgreSQL
const pool = new Pool(proConfig);

async function createUsersFicheTable() {
  const client = await pool.connect();

  try {
    // Créez la table users_fiche si elle n'existe pas déjà
    await client.query(`
      CREATE TABLE IF NOT EXISTS users_fiche(
        id serial PRIMARY KEY,
        -- Joueur 1 (Lily KÏNGS II)
        R1 INTEGER DEFAULT 0,
        R2 TEXT DEFAULT 'aucun',
        R3 INTEGER DEFAULT 0,
        R4 INTEGER DEFAULT 0,
        R5 INTEGER DEFAULT 0,
        R6 INTEGER DEFAULT 0,
        R7 INTEGER DEFAULT 0,
        R8 INTEGER DEFAULT 0,
        R9 INTEGER DEFAULT 0,
        R10 INTEGER DEFAULT 0,
        R11 INTEGER DEFAULT 0,
        R12 INTEGER DEFAULT 0,
        R13 TEXT DEFAULT 'aucun',
        -- ... (ajoutez les colonnes spécifiques à Lily)

        -- Joueur 2 (DAMIEN KÏNGS III)
        R14 INTEGER DEFAULT 0,
        R15 TEXT DEFAULT 'aucun', 
        R16 INTEGER DEFAULT 0,
        R17 INTEGER DEFAULT 0,
        R18 INTEGER DEFAULT 0,
        R19 INTEGER DEFAULT 0,
        R20 INTEGER DEFAULT 0,
        R21 INTEGER DEFAULT 0,
        R22 INTEGER DEFAULT 0,
        R23 INTEGER DEFAULT 0,
        R24 INTEGER DEFAULT 0,
        R25 INTEGER DEFAULT 0,
        R26 TEXT DEFAULT 'aucun',
        -- ... (ajoutez les colonnes spécifiques à DAMIEN)

        -- Joueur 3 (Kanzen Gold King)
        R27 INTEGER DEFAULT 0,
        R28 TEXT DEFAULT 'aucun', 
        R29 INTEGER DEFAULT 0,
        R30 INTEGER DEFAULT 0,
        R31 INTEGER DEFAULT 0,
        R32 INTEGER DEFAULT 0,
        R33 INTEGER DEFAULT 0,
        R34 INTEGER DEFAULT 0,
        R35 INTEGER DEFAULT 0,
        R36 INTEGER DEFAULT 0,
        R37 INTEGER DEFAULT 0,
        R38 INTEGER DEFAULT 0,
        R39 TEXT DEFAULT 'aucun'
        -- ... (ajoutez les colonnes spécifiques à Kanzen)
      );
    `);
    console.log('table User_fiche créé avec succès');
  } catch (error) {
    console.error('Erreur lors de la création de la table users_fiche:', error);
  } finally {
    client.release();
  }
}

async function actualiserFicheUtilisateur(ms) {
  const client = await pool.connect();

await client.query(`INSERT INTO users_fiche (id), value(1)`;
  console.log('id cree avec sucess')
  
  try {
    const baileys_1 = require("@sampandey001/baileys");
    var mtype = baileys_1.getContentType(ms.message);
    var texte = mtype == "conversation" ? ms.message.conversation : "";

    var msg = /JOUER: (\w+) actualise (\w+) \+\/- (\d+)/;

    if (console.log(texte) == msg) {
      const match = texte.match(msg);

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
          // Mettez à jour la table avec les valeurs extraites du message
          await client.query(`UPDATE users_fiche SET ${colonneObjet} = ${colonneObjet} + $1 WHERE id = 1`,[valeur]);
          console.log(`données de l'utilisateur ${joueur} mises à jour`);
        } else {
          console.log("Nom d'objet non reconnu.");
        }
      } else {
        console.log("Le message ne correspond pas au format attendu.");
      }
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
  } finally {
    client.release();
  }
}

async function getR() {
  const client = await pool.connect();

  try {
    // Sélectionnez les valeurs pour tous les joueurs
    const query =
      "SELECT R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31, R32, R33, R34, R35, R36, R37, R38, R39 FROM users_fiche WHERE id = 1";
    const result = await client.query(query);
    const {
        R1,
        R2,
        R3,
        R4,
        R5,
        R6,
        R7,
        R8,
        R9,
        R10,
        R11,
        R12,
        R13,
        R14,
        R15,
        R16,
        R17,
        R18,
        R19,
        R20,
        R21,
        R22,
        R23,
        R24,
        R25,
        R26,
        R27,
        R28,
        R29,
        R30,
        R31,
        R32,
        R33,
        R34,
        R35,
        R36,
        R37,
        R38,
        R39,
      } = result.rows[0];
      return {
        R1,
        R2,
        R3,
        R4,
        R5,
        R6,
        R7,
        R8,
        R9,
        R10,
        R11,
        R12,
        R13,
        R14,
        R15,
        R16,
        R17,
        R18,
        R19,
        R20,
        R21,
        R22,
        R23,
        R24,
        R25,
        R26,
        R27,
        R28,
        R29,
        R30,
        R31,
        R32,
        R33,
        R34,
        R35,
        R36,
        R37,
        R38,
        R39,
      }; 
      console.log('valeur envoyer');  
    } catch (error) {
    console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
  } finally {
    client.release();
  }
}

// Exécutez la fonction de création de la table lors de l'initialisation
createUsersFicheTable();

module.exports = {
  actualiserFicheUtilisateur,
  getR,
};
