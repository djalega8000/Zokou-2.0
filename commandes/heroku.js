const { zokou } = require('../framework/zokou');
const s = require('../set')


zokou(
    {
        nomCom : "setvar",
        categorie : "heroku"
    }, async (dest , zk , commandeOptions) =>{

       const {ms,repondre,superUser , arg} = commandeOptions ;
       
       if(!superUser){repondre('Commande reserver au proprietaire du bot');return};
       if(!arg[0] || !(arg.join('').split('='))) {repondre('Mauvais formats ; voici le mode d\'emploie.\nSetvar NOM_OWNER=Fredora');return};
     
    const text = arg.join(" ")
     const Heroku = require("heroku-client");
   
     const heroku = new Heroku({
        token: s.HEROKU_APY_KEY,
      });

     let baseURI = "/apps/" + s.HEROKU_APP_NAME;
        await heroku.patch(baseURI + "/config-vars", {
          body: {
                  [text.split('=')[0]]: text.split('=')[1],
          },
        });
        await repondre('variable actualiser , redemarrage en cours....')
    }
);

zokou(
    {
        nomCom : "getallvar",
        categorie : "heroku"
    }, async (dest , zk , commandeOptions) =>{

       const {ms,repondre,superUser , arg} = commandeOptions ;
       
       if(!superUser){repondre('Commande reserver au proprietaire du bot');return}; 
      
            const Heroku = require("heroku-client");

			const heroku = new Heroku({
				token: s.HEROKU_APY_KEY,
			});
			let baseURI = "/apps/" + s.HEROKU_APP_NAME;

            let h = await heroku.get(baseURI+'/config-vars')
let str = '*liste des variables  Heroku *\n\n'
for (vr in h) {
str+= '🍁 *'+vr+'* '+'= '+h[vr]+'\n'
}
 repondre(str)


}

);       


    zokou(
        {
            nomCom : "getvar",
            categorie : "heroku"
        }, async (dest , zk , commandeOptions) =>{
    
           const {ms,repondre,superUser , arg} = commandeOptions ;
           
           if(!superUser){repondre('Commande reserver au proprietaire du bot');return}; 
           if(!arg[0]) {repondre('Inserez le nom de la variabke en grand Charactere'); return} ;
      
           try {
            const Heroku = require("heroku-client");
               
            const heroku = new Heroku({
              token: s.HEROKU_APY_KEY,
            });
            let baseURI = "/apps/" + s.HEROKU_APP_NAME;
        let h = await heroku.get(baseURI+'/config-vars')
        for (vr in h) {
        if( arg.join(' ') ===vr ) return  repondre( vr+'= '+h[vr]) 	;
        } 
        
        } catch(e) {repondre('Erreur lors de la procedure ' + e)}
   
        });

