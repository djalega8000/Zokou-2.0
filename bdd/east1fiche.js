const { Pool } = require("pg");

var dbUrl = "postgres://neoverse_user:e4Ts4KmggWvcvG3K2ijj9Cu2OciBJLff@dpg-ckrsaafd47qs73b2kt40-a.oregon-postgres.render.com/neoverse";
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);

async function createEast1FicheTable() {
  const client = await pool.connect();

  try {
    // Créez la table east1_fiche si elle n'existe pas déjà
    await client.query(`
      CREATE TABLE IF NOT EXISTS east1_fiche(
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
    console.log('Table east1_fiche créée avec succès');
  } catch (error) {
    console.error('Erreur lors de la création de la table east1_fiche:', error);
  } finally {
    client.release();
  }
}

async function getR() {
  const client = await pool.connect();

  try {
    // Sélectionnez les valeurs pour tous les joueurs
    const query =
      "SELECT r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27, r28, r29, r30, r31, r32, r33, r34, r35, r36 FROM east1_fiche";
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

createEast1FicheTable();

module.exports = {
  createEast1FicheTable,
  getR,
};
