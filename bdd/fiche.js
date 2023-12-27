require("dotenv").config();

const { Pool } = require("pg");

var dbUrl = "postgres://neoverse_user:e4Ts4KmggWvcvG3K2ijj9Cu2OciBJLff@dpg-ckrsaafd47qs73b2kt40-a.oregon-postgres.render.com/neoverse";
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);

async function createUsersFicheTable() {
  const client = await pool.connect();

  try {
    // Créez la table users_fiche si elle n'existe pas déjà
    await client.query(`
      CREATE TABLE IF NOT EXISTS users_fiche(
        id serial PRIMARY KEY,
        -- Joueur 1 (Lily KÏNGS II)
        R1 INTEGER DEFAULT 10000,
        R2 TEXT DEFAULT 'aucun',
        R3 INTEGER DEFAULT 10000,
        R4 INTEGER DEFAULT 10000,
        R5 INTEGER DEFAULT 10000,
        R6 INTEGER DEFAULT 10000,
        R7 INTEGER DEFAULT 10000,
        R8 INTEGER DEFAULT 10000,
        R9 INTEGER DEFAULT 10000,
        R10 INTEGER DEFAULT 10000,
        R11 INTEGER DEFAULT 10000,
        R12 INTEGER DEFAULT 10000,
        R13 TEXT DEFAULT 'aucun',
        -- ... (ajoutez les colonnes spécifiques à Lily)

        -- Joueur 2 (DAMIEN KÏNGS III)
        R14 INTEGER DEFAULT 10000,
        R15 TEXT DEFAULT 'aucun', 
        R16 INTEGER DEFAULT 10000,
        R17 INTEGER DEFAULT 10000,
        R18 INTEGER DEFAULT 10000,
        R19 INTEGER DEFAULT 10000,
        R20 INTEGER DEFAULT 10000,
        R21 INTEGER DEFAULT 10000,
        R22 INTEGER DEFAULT 10000,
        R23 INTEGER DEFAULT 10000,
        R24 INTEGER DEFAULT 10000,
        R25 INTEGER DEFAULT 10000,
        R26 TEXT DEFAULT 'aucun',
        -- ... (ajoutez les colonnes spécifiques à DAMIEN)

        -- Joueur 3 (Kanzen Gold King)
        R27 INTEGER DEFAULT 10000,
        R28 TEXT DEFAULT 'aucun', 
        R29 INTEGER DEFAULT 10000,
        R30 INTEGER DEFAULT 10000,
        R31 INTEGER DEFAULT 10000,
        R32 INTEGER DEFAULT 10000,
        R33 INTEGER DEFAULT 10000,
        R34 INTEGER DEFAULT 10000,
        R35 INTEGER DEFAULT 10000,
        R36 INTEGER DEFAULT 10000,
        R37 INTEGER DEFAULT 10000,
        R38 INTEGER DEFAULT 10000,
        R39 TEXT DEFAULT 'aucun'
        -- ... (ajoutez les colonnes spécifiques à Kanzen)
      );
    `);
    console.log('Table users_fiche créée avec succès');
  } catch (error) {
    console.error('Erreur lors de la création de la table users_fiche:', error);
  } finally {
    client.release();
  }
}

async function actualiserFicheUtilisateur(ms) {
  const client = await pool.connect();

  try {
    await client.query(`INSERT INTO users_fiche (id) VALUES (1) ON CONFLICT (id) DO NOTHING`);
    console.log('ID créé avec succès');
  
    const baileys_1 = require("@sampandey001/baileys");
    var mtype = baileys_1.getContentType(ms.message);
    var texte = mtype == "conversation" ? ms.message.conversation : "";

    var msg = /JOUER: (\w+) actualise (\w+) \+\/- (\d+)/;

    if (texte.match(msg)) {
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
          await client.query(`UPDATE users_fiche SET ${colonneObjet} = ${colonneObjet} + $1 WHERE id = 1`, [valeur]);
          console.log(`Données de l'utilisateur ${joueur} mises à jour`);
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
    const query = "SELECT * FROM users_fiche WHERE id = 1";
    const result = await client.query(query);

    return result.rows[0];
  } catch (error) {
    console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
  } finally {
    client.release();
  }
}

createUsersFicheTable();

module.exports = {
  actualiserFicheUtilisateur,
  getR,
};
