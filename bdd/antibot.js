require("dotenv").config();
const { Pool } = require("pg");
let s =require("../set")
var dbUrl=s.DATABASE_URL?s.DATABASE_URL:"postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9"

const proConfig = {
  connectionString:dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);

const creerTableAntibot=async ()=>
{
  try{
  

    
await pool.query("CREATE TABLE IF NOT EXISTS antibot(groupeJid text PRIMARY KEY,etat text default r);")

  }catch(e){console.log("oups une erreur est survenue lors de la création de la table antibot "+e)}
}


module.exports.getAntibot=async(groupeJid)=>
  {
      if(!groupeJid.endsWith("@g.us")){return;}
    
       try{ 
         await creerTableAntibot();
           var resultat=await pool.query("SELECT * FROM antibot WHERE groupeJid=$1;",[groupeJid]);
         if(resultat.rowCount)
         {
           return resultat.rows;
         }
         else{return [];}
       }catch(erreur ){console.log("Une erreur s'est produite lors de la récupération de la table antibot "+erreur);}
  }



module.exports.ajouterAntibot=async(groupeJid,etat)=>
  {
    if(!groupeJid.endsWith("@g.us")){return;}
     var resultat ;

    
        try{
          resultat=  await pool.query("SELECT * FROM antibot WHERE groupeJid=$1;",[groupeJid])
        }catch(erreur){

          await creerTableAntibot();
          resultat=  await pool.query("SELECT * FROM antibot WHERE groupeJid=$1;",[groupeJid])
          
        }

    if(resultat.rows.length)
    {
      await pool.query("UPDATE antibot SET etat=$1 WHERE groupeJid=$2;",[etat,groupeJid]);
      await pool.query("commit;")
    }else
    {
      await pool.query("INSERT INTO antibot VALUES($1,$2);",[groupeJid,etat])
      await pool.query("commit;")
    }

  }
