const { Pool } = require("pg");

var dbUrl = "postgres://neoverse_user:e4Ts4KmggWvcvG3K2ijj9Cu2OciBJLff@dpg-ckrsaafd47qs73b2kt40-a.oregon-postgres.render.com/neoverse";
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
      CREATE TABLE IF NOT EXISTS north_fiche(
        id SERIAL PRIMARY KEY,
        r1 INTEGER DEFAULT 0,
        r2 TEXT DEFAULT 'aucun',
        r3 INTEGER DEFAULT 0,
        r4 INTEGER DEFAULT 0,
        r5 INTEGER DEFAULT 0,
        r6 INTEGER DEFAULT 0,
        r7 INTEGER DEFAULT 0,
        r8 INTEGER DEFAULT 0,
        r9 INTEGER DEFAULT 0,
        r10 INTEGER DEFAULT 0,
        r11 INTEGER DEFAULT 0,
        r12 TEXT DEFAULT 'aucun',
        r13 INTEGER DEFAULT 0,
        r14 TEXT DEFAULT 'aucun',
        r15 INTEGER DEFAULT 0, 
        r16 INTEGER DEFAULT 0,
        r17 INTEGER DEFAULT 0,
        r18 INTEGER DEFAULT 0,
        r19 INTEGER DEFAULT 0,
        r20 INTEGER DEFAULT 0,
        r21 INTEGER DEFAULT 0,
        r22 INTEGER DEFAULT 0,
        r23 INTEGER DEFAULT 0,
        r24 INTEGER DEFAULT 0,
        r25 TEXT DEFAULT 'aucun',
        r26 INTEGER DEFAULT 0,
        r27 TEXT DEFAULT 'aucun',
        r28 INTEGER DEFAULT 0, 
        r29 INTEGER DEFAULT 0,
        r30 INTEGER DEFAULT 0,
        r31 INTEGER DEFAULT 0,
        r32 INTEGER DEFAULT 0,
        r33 INTEGER DEFAULT 0,
        r34 INTEGER DEFAULT 0,
        r35 INTEGER DEFAULT 0,
        r36 TEXT DEFAULT 'aucun'
      );
    `);
    console.log('Table north_fiche créée avec succès');
  } catch (error) {
    console.error('Erreur lors de la création de la table north_fiche:', error);
  } finally {
    client.release();
  }
}

async function insererValeur() { 
  const client = await pool.connect();
  try {
    await client.query(`
      INSERT INTO north_fiche(id, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27, r28, r29, r30, r31, r32, r33, r34, r35, r36)
      VALUES ('1', 0, 'aucun', 0, 0, 0, 0, 0, 0, 0, 0, 0, 'aucun', 0, 'aucun', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'aucun', 0, 'aucun', 0, 0, 0, 0, 0, 0, 0, 0, 0, 'aucun')
      WHERE
        id IS NULL AND
        r1 IS NULL AND
        r2 IS NULL AND
        r3 IS NULL AND
        r4 IS NULL AND
        r5 IS NULL AND
        r6 IS NULL AND
        r7 IS NULL AND
        r8 IS NULL AND
        r9 IS NULL AND
        r10 IS NULL AND
        r11 IS NULL AND
        r12 IS NULL AND
        r13 IS NULL AND
        r14 IS NULL AND
        r15 IS NULL AND
        r16 IS NULL AND
        r17 IS NULL AND
        r18 IS NULL AND
        r19 IS NULL AND
        r20 IS NULL AND
        r21 IS NULL AND
        r22 IS NULL AND
        r23 IS NULL AND
        r24 IS NULL AND
        r25 IS NULL AND
        r26 IS NULL AND
        r27 IS NULL AND
        r28 IS NULL AND
        r29 IS NULL AND
        r30 IS NULL AND
        r31 IS NULL AND
        r32 IS NULL AND
        r33 IS NULL AND
        r34 IS NULL AND
        r35 IS NULL AND
        r36 IS NULL
    `);
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
      "SELECT r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27, r28, r29, r30, r31, r32, r33, r34, r35, r36 FROM north_fiche WHERE id = 1";
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

module.exports = {
  createNorth1FicheTable,
  insererValeur,
  getR,
};
