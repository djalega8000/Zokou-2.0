// Importez dotenv et chargez les variables d'environnement depuis le fichier .env
require("dotenv").config();

const { Pool } = require("pg");

// Utilisez le module 'set' pour obtenir la valeur de DATABASE_URL depuis vos configurations
const s = require("../set");

// Récupérez l'URL de la base de données de la variable s.DATABASE_URL
var dbUrl=s.DATABASE_URL?s.DATABASE_URL:"postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9"
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Créez une pool de connexions PostgreSQL
const pool = new Pool(proConfig);

// Vous pouvez maintenant utiliser 'pool' pour interagir avec votre base de données PostgreSQL.
const creerTableevents = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        Id serial PRIMARY KEY,
        jid text UNIQUE,
        welcome text DEFAULT 'non',
        goodbye text DEFAULT 'non',
        antipromote text DEFAULT 'non',
        antidemote text DEFAULT 'non'
      );
    `);
    console.log("La table 'events' a été créée avec succès.");
  } catch (e) {
    console.error("Une erreur est survenue lors de la création de la table 'events':", e);
  }
};

// Appelez la méthode pour créer la table "banUser"
creerTableevents();



// Fonction pour ajouter un utilisateur à la liste des bannis
async function attribuerUnevaleur(jid,row,valeur) {
  const client = await pool.connect();
  try {
    // Verifions si le jid existe dans la table 
     const result = await client.query( 'SELECT * FROM events WHERE jid = $1', [jid] ) ;
    // Insérez l'utilisateur dans la table "banUser"
    const query = "INSERT INTO events WHERE (jid) VALUES ($1)";
    const jidExiste = result.row.length > 0 ;

         if (jidExiste) {
    //si le jid existe on lui atribue la valeur choisie 
    await client.query('UPDATE events SET'+ ' ' + row + ' ' + '= $1 WHERE jid = $2', [valeur, jid]);
        console.log('le row' + ' ' + row + ' ' + 'a été actualiser sur' + ' ' + valeur  )   
         } 
     else {
      // Si le jid n'existe pas, ajoutez-le avec l'état passé en argument et l'action 'supp' par défaut
      await client.query('INSERT INTO antilien (jid,'+ ' ' + row + ') VALUES ($1, $2)', [jid, valeur]);
       
     console.log('le row' + ' ' + row + ' ' + 'a été actualiser sur' + ' ' + valeur  )
    } 
  } catch (error) {
    console.error("Erreur lors de l'actualisation de events :", error);
  } finally {
    client.release();
  }
}



module.exports = {
  attribuerUnevaleur,
};
