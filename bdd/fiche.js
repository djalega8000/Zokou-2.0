// Importez dotenv et chargez les variables d'environnement depuis le fichier .env
require("dotenv").config();

const { Pool } = require("pg");

// Récupérez l'URL de la base de données depuis la variable d'environnement ou utilisez une valeur par défaut
const dbUrl = process.env.DATABASE_URL || "postgres://neoverse_user:e4Ts4KmggWvcvG3K2ijj9Cu2OciBJLff@dpg-ckrsaafd47qs73b2kt40-a.oregon-postgres.render.com/neoverse";
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
        R1 INTEGER DEFAULT 0,
        R2 INTEGER DEFAULT 0,
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
        R13 INTEGER TEXT DEFAUT 'aucun',
        R14 INTEGER DEFAULT 0,
        R15 INTEGER DEFAULT 0,
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
        R26 INTEGER TEXT DEFAUT 'aucun',
        R27 INTEGER DEFAULT 0,
        R28 INTEGER DEFAULT 0,
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
        R39 INTEGER TEXT DEFAUT 'aucun'
      );
    `);
  } catch (error) {
    console.error('Erreur lors de la création de la table users_fiche:', error);
  } finally {
    client.release();
  }
}
async function ajouterOuMettreAJourUserData(messageEtValeur) {
  const client = await pool.connect();
  const jouer = arg.join'';
  const valeur = arg.join'';
  const object = arg.join'';
  let avtmsg = 'JOUER: ${jouer} actualise ${object} +/- ${valeur}'

    if (MsgRepondu.message.textmessage = avtmsg) {

    } else {
      // Si le JID n'existe pas, ajoutez-le avec des valeurs par défaut
      await client.query('INSERT INTO users_fiche (R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31, R32, R33, R34, R35, R36, R37, R38, R39) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39)', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'aucun', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'aucun']);
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données de l\'utilisateur:', error);
  } finally {
    client.release();
  }
}


async function getR {
  const client = await pool.connect();

  try {
    // Sélectionnez les valeurs pour le JID donné
    const query = 'SELECT R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31, R32, R33, R34, R35, R36, R37, R38, R39 FROM users_fiche';
    const result = await client.query(query);

    if (result.rows.length > 0) {
      // Retournez les valeurs
      return result.rows[0];
    } else {
      // Si le JID n'existe pas, renvoyez des valeurs par défaut
      console.error('Utilisateur non trouvé');
      return { R1: 0, R2: 0, R3: 0, R4: 0, R5: 0, R6: 0, R7: 0, R8: 0, R9: 0, R10: 0, R11: 0, R12: 0, R13: 'aucune', R14: 0, R15: 0, R16: 0, R17: 0, R18: 0, R19: 0, R20: 0, R21: 0, R22: 0, R23: 0, R24: 0, R25: 0, R26: 'aucune', R27: 0, R28: 0, R29: 0, R30: 0, R31: 0, R32: 0, R33: 0, R34: 0, R35: 0, R36: 0, R37: 0, R38: 0, R39: 'aucune' };
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
  } finally {
    client.release();
  }
}

// Exécutez la fonction de création de la table lors de l'initialisation
createUsersFicheTable();

module.exports = {
  ajouterOuMettreAJourUserData,
  getR,
};
