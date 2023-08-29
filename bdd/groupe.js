require("dotenv").config();
const { Pool } = require("pg");
let s =require("../set")
var dbUrl=s.DATABASE_URL?s.DATABASE_URL:"postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9"

const proConfig = {
  connectionString:dbUrl ,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);


const creerTableGroupe= async()=>{
 try{ await pool.query("CREATE TABLE IF NOT EXISTS groupe(id text PRIMARY KEY ,antilien text default false,action text default false);")}catch(e){console.log(e)}
}


module.exports.getGroupe=async(groupe)=>{
  try{
    if(!groupe.endsWith("@g.us")) return;
  await creerTableGroupe();
  var resultat = await pool.query("SELECT * FROM groupe WHERE id=$1;",[groupe]);
  if(resultat.rowCount)
  {
    return resultat.rows;
  }
  else{return [];}
  }catch(e){console.log(e)}
};

module.exports.ajouterGroupe=async(groupe,etat)=>
  {
    if(!groupe.endsWith("@g.us")) return;
    var resultat;
    try{
            resultat = await pool.query("SELECT * FROM groupe WHERE id=$1;",[groupe]);
    }catch(erreur){

      await creerTableGroupe()
      resultat = await pool.query("SELECT * FROM groupe WHERE id=$1;",[groupe]);
    }

    if(resultat.rows.length)
    {
      var antilien =resultat.rows[0].antilien

      await pool.query("UPDATE groupe SET antilien=$1 WHERE id=$2;",[etat,groupe]);
      await pool.query("commit;")
    }else
    {
      await pool.query("INSERT INTO groupe VALUES($1,$2);", [groupe, etat]);
    await pool.query("commit;");
    }
  };

module.exports.ajouterAction=async(groupeid,action)=>
{
  if(!groupeid.endsWith("@g.us")){return;}
  var resultat;
  try{
      resultat=await pool.query("SELECT * FROM WHERE id=$1;",[groupeid])
  }catch(err){

    await creerTableGroupe();
    resultat =await pool.query("SELECT * FROM WHERE id=$1;",[groupeid])
  }

    if(resultat.rows.length)
    {
      pool.query("UPDATE SET action=$1 WHERE id=$2;",[action,groupeid])
      pool.query("commit;")
    }
    else{
         await pool.query("INSERT INTO groupe Values($1,$2);",[groupe,action])
      pool.query("commit;")
    }
  
};
