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
      CREATE TABLE IF NOT EXISTS north4_fiche(
        id SERIAL PRIMARY KEY,
        r1 text,
        r2 text,
        r3 text,
        r4 text,
        r5 text,
        r6 text,
        r7 text,
        r8 text,
        r9 text,
        r10 text,
        r11 text,
        r12 text,
        r13 text,
        r14 text,
        r15 text, 
        r16 text,
        r17 text,
        r18 text,
        r19 text,
        r20 text,
        r21 text,
        r22 text,
        r23 text,
        r24 text,
        r25 text,
        r26 text,
        r27 text,
        r28 text, 
        r29 text,
        r30 text,
        r31 text,
        r32 text,
        r33 text,
        r34 text,
        r35 text,
        r36 text
      );
    `);
    console.log('Table north4_fiche créée avec succès');
  } catch (error) {
    console.error('Erreur lors de la création de la table north4_fiche:', error);
  } finally {
    client.release();
  }
}

async function insererValeur() { 
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO north4_fiche(id, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27, r28, r29, r30, r31, r32, r33, r34, r35, r36)
      VALUES (1, 0, 'aucun', 0, 0, 0, 0, 0, 0, 0, 0, 0, 'aucun', 0, 'aucun', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'aucun', 0, 'aucun', 0, 0, 0, 0, 0, 0, 0, 0, 0, 'aucun')`;
    await client.quety(query);
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
      "SELECT r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27, r28, r29, r30, r31, r32, r33, r34, r35, r36 FROM north4_fiche WHERE id = 1";
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
