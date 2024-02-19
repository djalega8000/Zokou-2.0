const { zokou } = require('../framework/zokou');
const axios = require("axios")
let { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const {isUserBanned , addUserToBanList , removeUserFromBanList} = require("../bdd/banUser");
const  {addGroupToBanList,isGroupBanned,removeGroupFromBanList} = require("../bdd/banGroup");
const {isGroupOnlyAdmin,addGroupToOnlyAdminList,removeGroupFromOnlyAdminList} = require("../bdd/onlyAdmin");
const {removeSudoNumber,addSudoNumber,issudo} = require("../bdd/sudo");
//const conf = require("../set");
//const fs = require('fs-extra');


const sleep =  (ms) =>{
  return new Promise((resolve) =>{ setTimeout (resolve, ms)})
  
  } ;


zokou({ nomCom: "tgs", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, nomAuteurMessage, superUser } = commandeOptions;

  if (!superUser) {
    repondre('Commande reservée au propriétaire du bot'); return;
  }
  //const apikey = conf.APILOLHUMAIN

 // if (apikey === null || apikey === 'null') { repondre('Veillez vérifier votre apikey ou si vous en avez pas , veiller crée un compte sur api.lolhuman.xyz et vous en procurer une.'); return; };

  if (!arg[0]) {
    repondre("Veillez inserer un lien de stickers telegrame svp");
    return;
  }

  let lien = arg.join(' ');

  let name = lien.split('/addstickers/')[1] ;

  let api = 'https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=' + encodeURIComponent(name) ;

  try {

    let stickers = await axios.get(api) ;

    let type = null ;

    if (stickers.data.result.is_animated === true ||stickers.data.result.is_video === true  ) {

        type = 'Stickers animé'
    } else {
      type = 'Stickers non animé'
    }

    let msg = `   Zk-stickers-dl
    
*nom :* ${stickers.data.result.name}
*Type :* ${type} 
*Nombre de stickes :* ${(stickers.data.result.stickers).length}

    Telechargements en cours`

    await  repondre(msg) ;

     for ( let i = 0 ; i < (stickers.data.result.stickers).length ; i++ ) {

        let file = await axios.get(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${stickers.data.result.stickers[i].file_id}`) ;

        let buffer = await axios({
          method: 'get',  // Utilisez 'get' pour télécharger le fichier
          url:`https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${file.data.result.file_path}` ,
          responseType: 'arraybuffer',  // Définissez le type de réponse sur 'stream' pour gérer un flux de données
        })


        const sticker = new Sticker(buffer.data, {
          pack: nomAuteurMessage,
          author: "Zokou-md",
          type: StickerTypes.FULL,
          categories: ['🤩', '🎉'],
          id: '12345',
          quality: 50,
          background: '#000000'
        });
  
        const stickerBuffer = await sticker.toBuffer(); // Convertit l'autocollant en tampon (Buffer)
  
        await zk.sendMessage(
          dest,
          {
            sticker: stickerBuffer, // Utilisez le tampon (Buffer) directement dans l'objet de message
          },
          { quoted: ms }
        ); 
     }

  } catch (e) {
    repondre("erreur lors de la procédure \n", e);
  }
});



zokou({ nomCom: "crew", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, auteurMessage, superUser, auteurMsgRepondu, msgRepondu } = commandeOptions;

  if (!superUser) { repondre("Reserver au modérateur "); return };

  if (!arg[0]) { repondre('Veillez entrez le nom du groupe à creer'); return };
  if (!msgRepondu) { repondre('Veillez mentionner un membre a ajouté '); return; }

  const name = arg.join(" ")

  const group = await zk.groupCreate(name, [auteurMessage, auteurMsgRepondu])
  console.log("created group with id: " + group.gid)
  zk.sendMessage(group.id, { text: `Bienvenue dans ${name}` })

});

zokou({ nomCom: "bye", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;
  if (!verifGroupe) { repondre("commande reserver au groupe uniquement"); return };
  if (!superUser) {
    repondre("commande reservée au propriétaire");
    return;
  }

  await zk.groupLeave(dest)
});

zokou({ nomCom: "rejoindre", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;

  if (!superUser) {
    repondre("commande reservée au propriétaire du bot");
    return;
  }
  let result = arg[0].split('https://chat.whatsapp.com/')[1] ;
 await zk.groupAcceptInvite(result) ;
  
      repondre(`Succes`).catch((e)=>{
  repondre('Erreur inconnus')
})

})


zokou({ nomCom: "jid", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("commande reservée au propriétaire du bot");
    return;
  }
              if(!msgRepondu) {
                jid = dest
              } else {
                jid = auteurMsgRepondu
              } ;
   zk.sendMessage(dest,{text : jid },{quoted:ms});

        }) ;

  zokou({ nomCom: "save", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;
  
    if ( superUser) { 
  
      if(msgRepondu) {

        console.log(msgRepondu) ;

        let msg ;
  
        if (msgRepondu.imageMessage) {
  
          
  
       let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;
       // console.log(msgRepondu) ;
       msg = {
  
         image : { url : media } ,
         caption : msgRepondu.imageMessage.caption,
         
       }
      
  
        } else if (msgRepondu.videoMessage) {
  
          let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage) ;
  
          msg = {
  
            video : { url : media } ,
            caption : msgRepondu.videoMessage.caption,
            
          }
  
        } else if (msgRepondu.audioMessage) {
      
          let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage) ;
         
          msg = {
     
            audio : { url : media } ,
            mimetype:'audio/mp4',
             }     
          
        } else if (msgRepondu.stickerMessage) {
  
      
          let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage)
  
          let stickerMess = new Sticker(media, {
            pack: 'Zokou-tag',
            type: StickerTypes.CROPPED,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer2 = await stickerMess.toBuffer();
         
          msg = { sticker: stickerBuffer2}
  
  
        }  else {
            msg = {
               text : msgRepondu.conversation,
            }
        }
  
      zk.sendMessage(auteurMessage,msg)
  
      } else { repondre('Mentionner le message a enregistrer') }
  
  } else {
    repondre('Commande reservée aux moderateurs')
  }
  

  })
;

zokou({ nomCom: "block", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("commande reservée au propriétaire du bot");
    return;
  }
             
              if(!msgRepondu) { 
                if(verifGroupe) {
                  repondre('Veillez mentionner la personne a bloquer'); return
                } ;
                jid = dest

                 await zk.updateBlockStatus(jid, "block")
    .then( repondre('succes')) 
              } else {
                jid = auteurMsgRepondu
             await zk.updateBlockStatus(jid, "block")
    .then( repondre('succes'))   } ;

  });

zokou({ nomCom: "deblock", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("commande reservée au propriétaire du bot");
    return;
  }
              if(!msgRepondu) { 
                if(verifGroupe) {
                  repondre('Veillez mentionner la personne a debloquer'); return
                } ;
                jid = dest

                 await zk.updateBlockStatus(jid, "unblock")
    .then( repondre('succes')) 
              } else {
                jid = auteurMsgRepondu
             await zk.updateBlockStatus(jid, "unblock")
    .then( repondre('succes'))   } ;
  
    });

zokou({ nomCom: "purge", categorie: "Groupe", reaction: "📣" }, async (dest, zk, commandeOptions) => {

  const { auteurMessage ,ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser,prefixe } = commandeOptions

  const metadata = await zk.groupMetadata(dest) ;
 

  if (!verifGroupe) { repondre("✋🏿 ✋🏿cette commande est réservée aux groupes ❌"); return; }
  if (superUser || auteurMessage == metadata.owner) { 
  
   repondre('Les membres non admins seront retiré du groupe vous avez 5 secondes pour revandiquer votre choix en redemarrant le bot') ;
   await sleep(5000)
  let membresGroupe = verifGroupe ? await infosGroupe.participants : "";
try {
  let users = membresGroupe.filter((member) => !member.admin)

  for (const membre of users) {

    

   
    
await zk.groupParticipantsUpdate(
        dest, 
        [membre.id],
        "remove" 
    ) 
    await sleep(500)
    
  }  
} catch (e) {repondre("j'ai besoins des droit d'administration")} } else {
  repondre("Commande reserver au proprietaire du groupe pour des raisons de securitée"); return
}
});

zokou({
    nomCom: 'ban',
    categorie: 'Mods',
}, async (dest, zk, commandeOptions) => {

    const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser } = commandeOptions;

    
  if (!superUser) {repondre('Cette commande n\'est permis qu\'au proprietaire du bot') ; return}
    if (!arg[0]) {
        // Fonction 'repondre' doit être définie pour envoyer une réponse.
        repondre(`mentionner la victime een tappant ${prefixe}ban add/del pour bannir/debannir la victime`);
        return;
    };

    if (msgRepondu) {
        switch (arg.join(' ')) {
            case 'add':

           
   let youareban = await isUserBanned(auteurMsgRepondu)
           if(youareban) {repondre('Ce utilisateur est deja bannis') ; return}
               
           addUserToBanList(auteurMsgRepondu) ;
           
           repondre('Cet utiisateur est desormais banni des commandes du bot')
                break;
                case 'del':
                  let estbanni = await isUserBanned(auteurMsgRepondu)
    if (estbanni) {
        
        removeUserFromBanList(auteurMsgRepondu);
        repondre('Cet utilisateur est maintenant libre.');
    } else {
      repondre('Cet utilisateur n\'est pas banni.');
    }
    break;


            default:
                repondre('mauvaise option');
                break;
        }
    } else {
        repondre('mentionner la victime')
        return;
    }
});



zokou({
    nomCom: 'bangroup',
    categorie: 'Mods',
}, async (dest, zk, commandeOptions) => {

    const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser,verifGroupe } = commandeOptions;

    
  if (!superUser) {repondre('Cette commande n\'est permis qu\'au proprietaire du bot') ; return};
  if(!verifGroupe) {repondre('commande reserver pour les groupes' ) ; return };
    if (!arg[0]) {
        // Fonction 'repondre' doit être définie pour envoyer une réponse.
        repondre(`taper ${prefixe}bangroup add/del pour bannir/debannir le groupe`);
        return;
    };
    const groupalreadyBan = await isGroupBanned(dest)

        switch (arg.join(' ')) {
            case 'add':

           

            if(groupalreadyBan) {repondre('Ce groupe est deja bannis') ; return}
               
            addGroupToBanList(dest)

                break;
                case 'del':
                      
    if (groupalreadyBan) {
      removeGroupFromBanList(dest)
      repondre('Cet groupe est maintenant libre.');
        
    } else {
       
      repondre('Ce groupe n\'est pas banni.');
    }
    break;


            default:
                repondre('mauvaise option');
                break;
        }
    
});


zokou({
  nomCom: 'onlyadmin',
  categorie: 'Groupe',
}, async (dest, zk, commandeOptions) => {

  const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser,verifGroupe , verifAdmin } = commandeOptions;

  
if (superUser || verifAdmin) { 
if(!verifGroupe) {repondre('commande reserver pour les groupes' ) ; return };
  if (!arg[0]) {
      // Fonction 'repondre' doit être définie pour envoyer une réponse.
      repondre(`taper ${prefixe}onlyadmin add/del pour bannir/debannir le groupe`);
      return;
  };
  const groupalreadyBan = await isGroupOnlyAdmin(dest)

      switch (arg.join(' ')) {
          case 'add':

         

          if(groupalreadyBan) {repondre('Ce groupe est deja en mode onlyadmin') ; return}
             
          addGroupToOnlyAdminList(dest)

              break;
              case 'del':
                    
  if (groupalreadyBan) {
    removeGroupFromOnlyAdminList(dest)
    repondre('Cet groupe est maintenant libre.');
      
  } else {
     
    repondre('Ce groupe n\'est pas en mode onlyadmin.');
  }
  break;


          default:
              repondre('mauvaise option');
              break;
      }
} else { repondre('Vous avez pas droit a cette commande')}
});

zokou({
  nomCom: 'sudo',
  categorie: 'Mods',
}, async (dest, zk, commandeOptions) => {

  const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser } = commandeOptions;

  
if (!superUser) {repondre('Cette commande n\'est permis qu\'au proprietaire du bot') ; return}
  if (!arg[0]) {
      // Fonction 'repondre' doit être définie pour envoyer une réponse.
      repondre(`mentionner la personne en tappant ${prefixe}sudo add/del`);
      return;
  };

  if (msgRepondu) {
      switch (arg.join(' ')) {
          case 'add':

         
 let youaresudo = await issudo(auteurMsgRepondu)
         if(youaresudo) {repondre('Ce utilisateur est deja sudo') ; return}
             
         addSudoNumber(auteurMsgRepondu)
         repondre('succes')
              break;
              case 'del':
                let estsudo = await issudo(auteurMsgRepondu)
  if (estsudo) {
      
      removeSudoNumber(auteurMsgRepondu);
      repondre('Cet utilisateur est desormais non-sudo.');
  } else {
    repondre('Cet utilisateur n\'est pas sudo.');
  }
  break;


          default:
              repondre('mauvaise option');
              break;
      }
  } else {
      repondre('mentionner la victime')
      return;
  }
});


zokou({
      nomCom : 'mention',
      categorie : 'Mods',
} , async (dest,zk,commandeOptions) => {

     const {ms , repondre ,superUser , arg} = commandeOptions ;

     if (!superUser) {repondre('tu n\'as pas les droits pour cette commande') ; return}

     const mbdd = require('../bdd/mention') ;

     let alldata = await  mbdd.recupererToutesLesValeurs() ;
      data = alldata[0] ;
        

     if(!arg || arg.length < 1) { 

      let etat ;

      if (alldata.length === 0 ) { repondre(`*consigne :*
-Pour activer ou modifier le mention ; suivez ce synax : mention lien type message
Les differents type sont audio video image sticker
      
exemple : mention https://static.animecorner.me/2023/08/op2.jpg image Salut moi c'est luffy`) ; return}

          if(data.status == 'non') {
              etat = 'Desactiver'
          } else {
            etat = 'Activer' ;
          }
          
          mtype = data.type || 'aucune donnee' ;

          url = data.url || 'aucune donnee' ;


          let msg = `*Etat :* ${etat}
*Type :* ${mtype}
*Lien :* ${url}

*consigne :*
-Pour activer ou modifier le mention ; suivez ce synax : mention lien type message
Les differents type sont audio video image sticker

exemple : mention https://static.animecorner.me/2023/08/op2.jpg image Salut moi c'est Luffy

-Pour stoper le mention ; utiliser mention stop` ;

        repondre(msg) ;

        return ;
              }

     if(arg.length >= 2) {
       
          if(arg[0].startsWith('http') && (arg[1] == 'image' || arg[1] == 'audio' || arg[1] == 'video' || arg[1] == 'sticker')) {

                let args = [] ;
                  for (i = 2 ; i < arg.length ; i++) {
                      args.push(arg[i]) ;
                  }
              let message = args.join(' ') || '' ;

                  await mbdd.addOrUpdateDataInMention(arg[0],arg[1],message);
                  await mbdd.modifierStatusId1('oui')
                  .then(() =>{
                      repondre(' mention enregistrer ') ;
                  })
            } else {
              repondre('*consigne :* Pour activer ou modifier le mention ; suivez ce synax : *mention lien type* ; Les differents type sont audio video image sticker')
         } 
        
        } else if ( arg.length === 1 && arg[0] == 'stop') {

            await mbdd.modifierStatusId1('non')
            .then(() =>{
                  repondre(' mention stoppé ') ;
            })
        }
        else {
            repondre('Veiller respecter la consigne svp') ;
        }
})
