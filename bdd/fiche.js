require("dotenv").config();

const { Pool } = require("pg");

var dbUrl ="postgresql://postgres:aga-B533E3BcGdfa5*cFf*4daE4*f*fB@monorail.proxy.rlwy.net:12102/railway";
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);

async function createTexteFicheTable() {
  const client = await pool.connect();

  try {
    // Créez la table texte_fiche si elle n'existe pas déjà
    await client.query(`
      CREATE TABLE IF NOT EXISTS texte_fiche(
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
    console.log('Table texte_fiche créée avec succès');
  } catch (error) {
    console.error('Erreur lors de la création de la table texte_fiche:', error);
  } finally {
    client.release();
  }
}

async function getR() {
  const client = await pool.connect();

  try {
    // Sélectionnez les valeurs pour tous les joueurs
    const query =
      "SELECT R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20, R21, R22, R23, R24, R25, R26, R27, R28, R29, R30, R31, R32, R33, R34, R35, R36, R37, R38, R39 FROM texte_fiche";
    const result = await client.query(query);
    const {
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

createTexteFicheTable();

module.exports = {
  createTexteFicheTable,
  getR,
};
