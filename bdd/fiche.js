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
        id SERIAL PRIMARY KEY,
        jid VARCHAR(255) UNIQUE,
        R1 INTEGER DEFAULT 0,
        R2 INTEGER DEFAULT 0,
        R3 INTEGER DEFAULT 0,
        R4 INTEGER DEFAULT 0,
        R5 INTEGER DEFAULT 0,
        R6 INTEGER DEFAULT 0
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
    // Vérifiez si le JID existe déjà dans la table 'users_fiche'
    const result = await client.query('SELECT * FROM users_fiche WHERE jid = $1', [jid]);
    const jidExiste = result.rows.length > 0;

    if (jidExiste) {
      // Si le JID existe, mettez à jour les valeurs
      await client.query('UPDATE users_fiche SET R1 = R1 + 10000, R2 = R2 + 10000, R3 = R3 + 1, R4 = R4 + 10, R5 = R5 + 1, R6 = R6 + 1 WHERE jid = $1', [jid]);
    } else {
      // Si le JID n'existe pas, ajoutez-le avec des valeurs par défaut
      await client.query('INSERT INTO users_fiche (jid, R1, R2, R3, R4, R5, R6) VALUES ($1, $2, $3, $4, $5, $6, $7)', [jid, 10000, 10000, 0, 0, 1, 1]);
    }

  } catch (error) {
    console.error('Erreur lors de la mise à jour des données de l\'utilisateur:', error);
  } finally {
    client.release();
  }
}

async function getRByJID(jid) {
  const client = await pool.connect();

  try {
    // Sélectionnez les valeurs pour le JID donné
    const query = 'SELECT R1, R2, R3, R4, R5, R6 FROM users_fiche WHERE jid = $1';
    const result = await client.query(query, [jid]);

    if (result.rows.length > 0) {
      // Retournez les valeurs
      return result.rows[0];
    } else {
      // Si le JID n'existe pas, renvoyez des valeurs par défaut
      console.error('Utilisateur non trouvé');
      return { R1: 0, R2: 0, R3: 0, R4: 0, R5: 0, R6: 0 };
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
    return { R1: 0, R2: 0, R3: 0, R4: 0, R5: 0, R6: 0 };
  } finally {
    client.release();
  }
}

// Exécutez la fonction de création de la table lors de l'initialisation
createUsersFicheTable();

module.exports = {
  ajouterOuMettreAJourUserData,
  getRByJID,
};

