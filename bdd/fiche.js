// Importez dotenv et chargez les variables d'environnement depuis le fichier .env
require("dotenv").config();


const { Pool } = require("pg");

// Utilisez le module 'set' pour obtenir la valeur de DATABASE_URL depuis vos configurations
const s = require("../set");

// Récupérez l'URL de la base de données de la variable s.DATABASE_URL
const dbUrl = s.DATABASE_URL?s.DATABASE_URL:"postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" ;
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Créez une pool de connexions PostgreSQL
const pool = new Pool(proConfig);

async function createUsersRankTable() {
  const client = await pool.connect();

  try {
    // Créez la table users_rank si elle n'existe pas déjà
    await client.query(`
      CREATE TABLE IF NOT EXISTS users_fiche(
        id SERIAL PRIMARY KEY,
        jid VARCHAR(255) UNIQUE,
         R1 INTEGER DEFAULT 0,
         R2 INTEGER DEFAULT 0,
         R3 INTEGER DEFAULT 0,
         R4 INTEGER DEFAULT 0,
         R5 INTEGER DEFAULT 0,
         R6 INTEGER DEFAULT 0,
      );
    `);
  } catch (error) {
    console.error('Erreur lors de la création de la table users_fiche:', error);
  } finally {
    client.release();
  }
}

async function ajouterOuMettreAJourUserData(jid) {
  const client = await pool.connect();

  try {
    // Vérifiez si le JID existe déjà dans la table 'users_rank'
    const result = await client.query('SELECT * FROM users_fiche WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length > 0;

    if (jidExiste) {
      // Si le JID existe, mettez à jour XP (+10) et messages (+1)
      await client.query('UPDATE users_fiche SET R1 = Godlds+ 10000, R2 = 𝐅𝐚𝐧𝐬👥 + 10000 , R3 = 𝐍𝐄𝐎𝐜𝐨𝐢𝐧𝐬🔹+ 1, R4 = 𝐂𝐨𝐮𝐩𝐨𝐧𝐬🎟️ + 10 , R5 = Victoire + 1, R6= Defaite +1  WHERE jid = $1', [jid]);
    } else {
      // Si le JID n'existe pas, ajoutez-le avec XP = 10 et messages = 1
      await client.query('INSERT INTO users_fiche (jid, R1,R2,R3,R4,R5,R6) VALUES ($1, $2, $3, $4, $5, $6)', [jid, 100000, 10000, 0, 0, 5, 0];
    }

  } catch (error) {
    console.error('Erreur lors de la mise à jour des données de l\'utilisateur:', error);
  } finally {
    client.release();
  }
};

async function getRByJID(jid) {
  const client = await pool.connect();

  try {
    // Sélectionnez le nombre de messages et d'XP pour le JID donné
    const query = 'SELECT R1, R2, R3, R4, R5, R6 From users_fiche WHERE jid = $1';
    const result = await client.query(query, [jid]);

    if (result.rows.length > 0) {
      // Retournez les valeurs de messages et d'XP
      const { R1, R2, R3, R4, R5, R6 } = result.rows[0];
      return { R1, R2, R3, R4, R5, R6 };
    } else {
      // Si le JID n'existe pas, renvoyez des valeurs par défaut (0 messages et 0 XP)
    rrErreur lors de la récupération des données de l\'utilisateur:', error);
    return {Godlds : 0, 𝐅𝐚𝐧𝐬👥 : 10000 , 𝐍𝐄𝐎𝐜𝐨𝐢𝐧𝐬🔹: 1, 𝐂𝐨𝐮𝐩𝐨𝐧𝐬🎟️ : 10 , Victoire : 1, Defaite : 1}; // En cas d'erreur, renvoyez des valeurs par défaut
  } finally {
    client.release();
  }
}

async function getBottom10Users() {
  const client = await pool.connect();

  try {
    // Sélectionnez les 10 premiers utilisateurs classés par XP de manière ascendante (du plus bas au plus élevé)
    const query = 'SELECT jid, xp , messages FROM users_fiche ORDER BY xp DESC LIMIT 10';
    const result = await client.query(query);

    // Retournez le tableau des utilisateurs
    return result.rows;
  } catch (error) {
    console.error('Erreur lors de la récupération du bottom 10 des utilisateurs:', error);
    return []; // En cas d'erreur, renvoyez un tableau vide
  } finally {
    client.release();
  }
}



// Exécutez la fonction de création de la table lors de l'initialisation
createUsersRankTable();

module.exports = {
  ajouterOuMettreAJourUserData,
  getMessagesAndXPByJID,
  getBottom10Users,
};
