const {zokou} = require("../framework/zokou");
const conf = require("../set")
const {jidDecode}=require("@sampandey001/baileys")


zokou( {
  nomCom : "profile",
 categorie : "Fun",
   },
      async(dest,zk, commandeOptions)=> {

        const {ms , arg, repondre,auteurMessage,nomAuteurMessage, msgRepondu , auteurMsgRepondu} = commandeOptions ;
        let jid = null 
          let nom = null ;
        if (!msgRepondu) {
            jid = auteurMessage;
           nom = nomAuteurMessage
        } else {
            jid = auteurMsgRepondu;
            nom ="@"+auteurMsgRepondu.split("@")[0] ;
            
        } ;

      try { ppUrl = await zk.profilePictureUrl(jid , 'image') ; } catch { ppUrl = conf.IMAGE_MENU}
        const status = await zk.fetchStatus(jid) ;

          let mess = {
              image : { url : ppUrl },
              caption : '*Nom :* '+ nom + '\n*Actu :*\n' + status.status ,mentions:[auteurMsgRepondu]
          }
        var x =jidDecode(ms.message?.extendedTextMessage?.contextInfo?.participant)
        repondre("ru"+Object.values(x))
/*console.log(ms.message.extendedTextMessage.pushName+" le push")
        console.log("super p"+auteurMsgRepondu.user)
        var cv=jidDecode(auteurMsgRepondu)
        console.log("??"+cv.user)
        var vc=jidDecode(ms.message?.extendedTextMessage?.contextInfo?.participant)
        console.log("unrb"+vc.user)*/
            zk.sendMessage(dest,mess,{quoted : ms})
      });

/*zokou( {
  nomCom : "pseudo",
 categorie : "Mods",
   },
      async(dest,zk, commandeOptions)=> {

        const {ms , arg, repondre,superUser} = commandeOptions ;
  if (!superUser) { repondre('commande reserver au proprietaire du bot'); return} ;
        if (!arg[0]) { repondre('Veillez inserer votre nouvel pseudo'); return} ;

const nom = arg.join(" ")
        await zk.updateProfileName(nom);

        repondre('pseudo mis a jour')


      }) ;*/

