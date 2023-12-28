const { Pool } = require("pg");

var dbUrl = "postgresql://postgres:aga-B533E3BcGdfa5*cFf*4daE4*f*fB@monorail.proxy.rlwy.net:12102/railway";
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
        r1 integer default 10000,
        r2 text default aucun,
        r3 integer default 10000,
        r4 integer default 10000,
        r5 integer default 10000,
        r6 integer default 10000,
        r7 integer default 10000,
        r8 integer default 10000,
        r9 integer default 10000,
        r10 integer default 10000,
        r11 integer default 10000,
        r12 integer default 10000,
        r13 text default aucun,
        -- ... (ajoutez les colonnes spécifiques à Lily)

        -- Joueur 2 (DAMIEN KÏNGS III)
        r14 integer default 10000,
        r15 text default aucun, 
        r16 integer default 10000,
        r17 integer default 10000,
        r18 integer default 10000,
        r19 integer default 10000,
        r20 integer default 10000,
        r21 integer default 10000,
        r22 integer default 10000,
        r23 integer default 10000,
        r24 integer default 10000,
        r25 integer default 10000,
        r26 text default aucun,
        -- ... (ajoutez les colonnes spécifiques à DAMIEN)

        -- Joueur 3 (Kanzen Gold King)
        r27 integer default 10000,
        r28 text default aucun, 
        r29 integer default 10000,
        r30 integer default 10000,
        r31 integer default 10000,
        r32 integer default 10000,
        r33 integer default 10000,
        r34 integer default 10000,
        r35 integer default 10000,
        r36 integer default 10000,
        r37 integer default 10000,
        r38 integer default 10000,
        r39 text default aucun
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
      "SELECT r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27, r28, r29, r30, r31, r32, r33, r34, r35, r36, r37, r38, r39 FROM texte_fiche";
    const result = await client.query(query);
    const {
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

createTexteFicheTable();

module.exports = {
  createTexteFicheTable,
  getR,
};
