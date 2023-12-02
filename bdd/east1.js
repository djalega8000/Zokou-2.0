// Importez dotenv et chargez les variables d'environnement depuis le fichier .env
require("dotenv").config();

const { Pool } = require("pg");

// Utilisez le module 'set' pour obtenir la valeur de DATABASE_URL depuis vos configurations
const s = require("../set");

// Récupérez l'URL de la base de données de la variable s.DATABASE_URL
var dbUrl=s.DATABASE_URL?s.DATABASE_URL:"postgres://neoverse_user:e4Ts4KmggWvcvG3K2ijj9Cu2OciBJLff@dpg-ckrsaafd47qs73b2kt40-a.oregon-postgres.render.com/neoverse"
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Créez une pool de connexions PostgreSQL
const pool = new Pool(proConfig);

// Fonction pour créer la table "east1" avec une colonne "id"
const creerTableEast1 = async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS east1 (
          id serial PRIMARY KEY,
          message text,
          lien text
        );
      `);
      console.log("La table 'east1' a été créée avec succès.");
    } catch (e) {
      console.error("Une erreur est survenue lors de la création de la table 'east1':", e);
    }
  };
  
  // Appelez la méthode pour créer la table "east1"
  creerTableEast1();

// Fonction pour ajouter ou mettre à jour un enregistrement dans la table "east1"
async function addOrUpdateDataInEast1(message, lien) {
    const client = await pool.connect();
    try {
      // Insérez ou mettez à jour les données dans la table "east1"
      const query = `
        INSERT INTO east1 (id, message, lien)
        VALUES (1, $1, $2)
        ON CONFLICT (id)
        DO UPDATE SET message = excluded.message, lien = excluded.lien;
      `;
      const values = [message, lien];
  
      await client.query(query, values);
      console.log("Données ajoutées ou mises à jour dans la table 'east1' avec succès.");
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la mise à jour des données dans la table 'east1':", error);
    } finally {
      client.release();
    }
  };

 
  async function getDataFromEast1() {
    const client = await pool.connect();
    try {
      // Exécutez la requête SELECT pour récupérer les données
      const query = "SELECT message, lien FROM east1 WHERE id = 1";
      const result = await client.query(query);
  
      if (result.rows.length > 0) {
        const { message, lien } = result.rows[0];
        return { message, lien };
      } else {
        console.log("Aucune donnée trouvée dans la table 'east1'.");
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données depuis la table 'east1':", error);
      return null;
    } finally {
      client.release();
    }
  };
  
  
  

  module.exports = {
    addOrUpdateDataInEast1,
    getDataFromEast1,
    
  };
