const { Pool } = require("pg");

var dbUrl = "postgresql://postgres:aga-B533E3BcGdfa5*cFf*4daE4*f*fB@monorail.proxy.rlwy.net:12102/railway";
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);

async function createNorth1FicheTable() {
  const client = await pool.connect();

  try {
    // Créez la table north1_fiche si elle n'existe pas déjà
    await client.query(`
      CREATE TABLE IF NOT EXISTS north4_iche(
        id SERIAL PRIMARY KEY,
        r1 TEXT,
        r2 INTEGER,
        r3 INTEGER,
        r4 INTEGER,
        r5 INTEGER,
        r6 INTEGER,
        r7 INTEGER,
        r8 INTEGER,
        r9 INTEGER,
        r10 INTEGER,
        r11 INTEGER,
        r12 TEXT,
        r13 TEXT,
        r14 INTEGER,
        r15 INTEGER, 
        r16 INTEGER,
        r17 INTEGER,
        r18 INTEGER,
        r19 INTEGER,
        r20 INTEGER,
        r21 INTEGER,
        r22 INTEGER,
        r23 INTEGER,
        r24 TEXT,
        r25 TEXT,
        r26 INTEGER,
        r27 INTEGER,
        r28 INTEGER, 
        r29 INTEGER,
        r30 INTEGER,
        r31 INTEGER,
        r32 INTEGER,
        r33 INTEGER,
        r34 INTEGER,
        r35 INTEGER
        r36 TEXT
      );
    `);
    console.log('Table north4_iche créée avec succès');
  } catch (error) {
    console.error('Erreur lors de la création de la table north4_iche:', error);
  } finally {
    client.release();
  }
}

async function insererValeur() { 
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO north4_iche(id, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27, r28, r29, r30, r31, r32, r33, r34, r35, r36)
      VALUES (1,'aucun', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'aucun', 'aucun', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'aucun', 'aucun', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'aucun')`;
    await client.query(query);
    console.log('Valeur ajoutée avec succès si les colonnes étaient vides');
  } catch (error) {
    console.error('Erreur lors de l\'ajout des données', error);
  } finally {
    client.release();
  }
}

async function getR() {
  const client = await pool.connect();

  try {
    // Sélectionnez les valeurs pour tous les joueurs
    const query =
      "SELECT r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27, r28, r29, r30, r31, r32, r33, r34, r35, r36 FROM north4_iche WHERE id = 1";
    const result = await client.query(query);
    const {
      r1,
      r2,
      r3,
      r4,
      r5,
      r6,
      r7,
      r8,
      r9,
      r10,
      r11,
      r12,
      r13,
      r14,
      r15,
      r16,
      r17,
      r18,
      r19,
      r20,
      r21,
      r22,
      r23,
      r24,
      r25,
      r26,
      r27,
      r28,
      r29,
      r30,
      r31,
      r32,
      r33,
      r34,
      r35,
      r36
    } = result.rows[0];
    return {
      r1,
      r2,
      r3,
      r4,
      r5,
      r6,
      r7,
      r8,
      r9,
      r10,
      r11,
      r12,
      r13,
      r14,
      r15,
      r16,
      r17,
      r18,
      r19,
      r20,
      r21,
      r22,
      r23,
      r24,
      r25,
      r26,
      r27,
      r28,
      r29,
      r30,
      r31,
      r32,
      r33,
      r34,
      r35,
      r36
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
  } finally {
    client.release();
  }
}

createNorth1FicheTable();
insererValeur();

module.exports = {
  createNorth1FicheTable,
  insererValeur,
  getR,
};
