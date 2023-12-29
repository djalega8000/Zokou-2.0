const { Pool } = require("pg");

var dbUrl = "postgresql://postgres:aga-B533E3BcGdfa5*cFf*4daE4*f*fB@monorail.proxy.rlwy.net:12102/railway";
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);

async function createTexFicheTable() {
  const client = await pool.connect();

  try {
    // Créez la table texte_fiche si elle n'existe pas déjà
    await client.query(`
      CREATE TABLE IF NOT EXISTS tex_fiche(
        id SERIAL PRIMARY KEY,
        -- Joueur 1 (Lily KÏNGS II)
        r1 INTEGER DEFAULT 10000,
        r2 TEXT DEFAULT 'aucun',
        r3 INTEGER DEFAULT 10000,
        r4 INTEGER DEFAULT 10000,
        r5 INTEGER DEFAULT 10000,
        r6 INTEGER DEFAULT 10000,
        r7 INTEGER DEFAULT 10000,
        r8 INTEGER DEFAULT 10000,
        r9 INTEGER DEFAULT 10000,
        r10 INTEGER DEFAULT 10000,
        r11 INTEGER DEFAULT 10000,
        r12 INTEGER DEFAULT 10000,
        r13 TEXT DEFAULT 'aucun',
        -- ... (ajoutez les colonnes spécifiques à Lily)

        -- Joueur 2 (DAMIEN KÏNGS III)
        r14 INTEGER DEFAULT 10000,
        r15 TEXT DEFAULT 'aucun', 
        r16 INTEGER DEFAULT 10000,
        r17 INTEGER DEFAULT 10000,
        r18 INTEGER DEFAULT 10000,
        r19 INTEGER DEFAULT 10000,
        r20 INTEGER DEFAULT 10000,
        r21 INTEGER DEFAULT 10000,
        r22 INTEGER DEFAULT 10000,
        r23 INTEGER DEFAULT 10000,
        r24 INTEGER DEFAULT 10000,
        r25 INTEGER DEFAULT 10000,
        r26 TEXT DEFAULT 'aucun',
        -- ... (ajoutez les colonnes spécifiques à DAMIEN)

        -- Joueur 3 (Kanzen Gold King)
        r27 INTEGER DEFAULT 10000,
        r28 TEXT DEFAULT 'aucun', 
        r29 INTEGER DEFAULT 10000,
        r30 INTEGER DEFAULT 10000,
        r31 INTEGER DEFAULT 10000,
        r32 INTEGER DEFAULT 10000,
        r33 INTEGER DEFAULT 10000,
        r34 INTEGER DEFAULT 10000,
        r35 INTEGER DEFAULT 10000,
        r36 INTEGER DEFAULT 10000,
        r37 INTEGER DEFAULT 10000,
        r38 INTEGER DEFAULT 10000,
        r39 TEXT DEFAULT 'aucun'
        -- ... (ajoutez les colonnes spécifiques à Kanzen)
      );
    `);
    console.log('Table tex_fiche créée avec succès');
  } catch (error) {
    console.error('Erreur lors de la création de la table tex_fiche:', error);
  } finally {
    client.release();
  }
}

async function getR() {
  const client = await pool.connect();

  try {
    // Sélectionnez les valeurs pour tous les joueurs
    const query =
      "SELECT r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27, r28, r29, r30, r31, r32, r33, r34, r35, r36, r37, r38, r39 FROM tex_fiche WHERE id = 1";
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
      r36,
      r37,
      r38,
      r39,
    } = result.rows[0];
    return {
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
      r36,
      r37,
      r38,
      r39,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
  } finally {
    client.release();
  }
}

createTexFicheTable();

module.exports = {
  createTexFicheTable,
  getR,
};
