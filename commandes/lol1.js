const { zokou } = require('../framework/zokou');

zokou(
  {
    nomCom: "lol"
    categorie: "Conversion" 
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre } = 
       commandeOptions;
  
   try {
     repondre("LoL")
     await sleep(1000)
  
  for (let i=0; i<=10; i++){
    repondre("LOL encore" ${''.repeat(i)} ${(i*10)})
      await sleep(1000);
  }
  repondre ("puis LOL");
  await sleep(1000);
 
 repondre("un autre LOL");
 await sleep(1000);
 
 repondre("reLOL");
 await sleep (1000);
 
 repondre ("un dernier LOL");
 await sleep(1000);
 
 repondre ("enfin LOL");
 await sleep(1000);
 
 repondre ("LOL enfin");
 await sleep(1000);
 
 repondre (".LOL");
 await sleep(1000);
 
 return repondre ('*BIG LOL*');
   } catch (error) {
     console.error('Une erreur est survenue:', error.message);
     repondre("Une erreur est survenue");
 
    }
  }
); function sleep(ms) {
  return new promise ((resolve)=>
  setTimeout(resolve, ms));
  
}