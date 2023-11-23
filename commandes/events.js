const { zokou } = require('../framework/zokou');
const {attribuerUnevaleur} = require('../bdd/welcome')

async fonction events(nomCom) {

zokou(
    {
        nomCom : nomCom,
        categorie : 'Groupe'
        
    },async (dest,zk,commandeOptions) => {

 const {ms , arg, repondre,superUser , verifAdmin } = commandeOptions;
 if ( verifAdmin || superUser ) {

if (!arg[0] || arg.join(' ') == ' ') { repondre('welcome oui pour activer et welcome non pour desactiver')}

   else {
      
if ( arg[0] == 'oui' || arg[0] == 'non') {

     await attribuerUnevaleur(dest,nomCom,arg[0]) ;
    repondre("le welcome a été actualisé sur " + arg[non]) ;
} else {
   repondre('oui pour activer et non pour desactiver') ;
}
   }
 } else {repondre('Vous pouvez pas utiliser cette commande') }
 
  })

} ;

events('welcome') ;
events('goodbye') ;
