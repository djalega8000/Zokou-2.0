

const { zokou } = require("../framework/zokou")
//const { getGroupe } = require("../bdd/groupe")
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const {ajouterOuMettreAJourJid,mettreAJourAction,verifierEtatJid} = require("../bdd/antilien")
const {atbajouterOuMettreAJourJid,atbrecupererActionJid,atbverifierEtatJid,atbmettreAJourAction} = require("../bdd/antibot")
const fs = require("fs-extra");
const conf = require("../set");
const { uploadImageToImgur } = require('../framework/imgur');




zokou({ nomCom: "appel", categorie: "Groupe", reaction: "📣" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions


 

  if (!verifGroupe) { repondre("✋🏿 ✋🏿cette commande est réservée aux groupes ❌"); return; }
  if (!arg || arg === ' ') {
  mess = 'Aucun Message'
  } else {
    mess = arg.join(' ')
  } ;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  var tag = ""; let car = `──────▄▌▐▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▌\n───▄▄██▌█ la Caravane du\n▄▄▄▌▐██▌█ bonheur arrive\n███████▌█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌\n▀(⊙)▀▀▀▀▀▀▀(⊙)(⊙)▀▀▀▀▀▀▀▀▀▀(⊙)▀▀`

  tag += `========================\n  
        🌟 *Zokou-Md* 🌟
========================\n
👥 Groupe : ${nomGroupe} 🚀 
👤 Auteur : *${nomAuteurMessage}* 👋 
📜 Message : *${mess}* 📝
========================\n
\n

` ;




  let emoji = ['🦴', '👀', '😮‍💨', '❌', '✔️', '😇', '⚙️', '🔧', '🎊', '😡', '🙏🏿', '⛔️', '$','😟','🥵','🐅']
  let random = Math.floor(Math.random() * (emoji.length - 1))


  for (const membre of membresGroupe) {
    tag += `${emoji[random]}      @${membre.id.split("@")[0]}\n`
  }

 
 if (verifAdmin || superUser) {

  zk.sendMessage(dest, { text: tag, mentions: membresGroupe.map((i) => i.id) }, { quoted: ms })

   } else { repondre('commande reserver aux admins')}

});


zokou({ nomCom: "lien", categorie: "Groupe", reaction: "🙋" }, async (dest, zk, commandeOptions) => {
  const { repondre, nomGroupe, nomAuteurMessage, verifGroupe } = commandeOptions;
  if (!verifGroupe) { repondre("wait bro , tu veux le lien de mon dm?"); return; };


  var link = await zk.groupInviteCode(dest)
  var lien = `https://chat.whatsapp.com/${link}`;

  let mess = `salut ${nomAuteurMessage} , voici le lien du groupe ${nomGroupe} \n

Lien :${lien}`
  repondre(mess)


});
/** *nommer un membre comme admin */
zokou({ nomCom: "nommer", categorie: "Groupe", reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { ms, repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifAdmin, verifZokouAdmin, verifGroupe, utilisateur, mbre, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("Pour les groupe uniquement"); }


  const verifMember = (user) => {

    for (const m of membresGroupe) {
      if (m.id !== user) {
        continue;
      }
      else { return true }
      //membre=//(m.id==auteurMsgRepondu? return true) :false;
    }
  }

  const memberAdmin = (membresGroupe) => {
    let admin = [];
    for (m of membresGroupe) {
      if (m.admin == null) continue;
      admin.push(m.id);

    }
    // else{admin= false;}
    return admin;
  }

  const a = verifGroupe ? memberAdmin(membresGroupe) : '';


  let admin = verifGroupe ? a.includes(auteurMsgRepondu) : false;
  let membre = verifMember(auteurMsgRepondu)
  let autAdmin = verifGroupe ? a.includes(auteurMessage) : false;
  zkad = verifGroupe ? a.includes(idBot) : false;
  try {
    // repondre(verifZokouAdmin)

    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin == false) {
              var txt = `🎊🎊🎊  @${auteurMsgRepondu.split("@")[0]} est monté(e) en grade.\n
                      il/elle a été nommé(e) administrateur du groupe.`
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "promote");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })
            } else { return repondre("Ce membre est déja administrateur du groupe.") }

          } else { return repondre("Cet utilisateur ne fait pas partir du groupe."); }
        }
        else { return repondre("Désolé je ne peut pas effectuer cette action car je ne suis pas administrateur du groupe .") }

      } else { repondre("veuiller taguer le membre à nommer"); }
    } else { return repondre("Désolé je ne peut pas effectuer cette action car vous n'êtes pas administrateur du groupe .") }
  } catch (e) { repondre("oups " + e) }

})

//fin nommer
/** ***demettre */

zokou({ nomCom: "demettre", categorie: "Groupe", reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { ms, repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifAdmin, verifZokouAdmin, verifGroupe, utilisateur, mbre, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("Pour les groupe uniquement"); }


  const verifMember = (user) => {

    for (const m of membresGroupe) {
      if (m.id !== user) {
        continue;
      }
      else { return true }
      //membre=//(m.id==auteurMsgRepondu? return true) :false;
    }
  }

  const memberAdmin = (membresGroupe) => {
    let admin = [];
    for (m of membresGroupe) {
      if (m.admin == null) continue;
      admin.push(m.id);

    }
    // else{admin= false;}
    return admin;
  }

  const a = verifGroupe ? memberAdmin(membresGroupe) : '';


  let admin = verifGroupe ? a.includes(auteurMsgRepondu) : false;
  let membre = verifMember(auteurMsgRepondu)
  let autAdmin = verifGroupe ? a.includes(auteurMessage) : false;
  zkad = verifGroupe ? a.includes(idBot) : false;
  try {
    // repondre(verifZokouAdmin)

    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin == false) {

              repondre("Ce membre n'est pas un  administrateur du groupe.")

            } else {
              var txt = `@${auteurMsgRepondu.split("@")[0]} a été  démis de ses fonctions d'administrateur du groupe..\n`
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "demote");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })
            }

          } else { return repondre("Cet utilisateur ne fait pas partir du groupe."); }
        }
        else { return repondre("Désolé je ne peut pas effectuer cette action car je ne suis pas administrateur du groupe .") }

      } else { repondre("veuiller taguer le membre à démettre"); }
    } else { return repondre("Désolé je ne peut pas effectuer cette action car vous n'êtes pas administrateur du groupe .") }
  } catch (e) { repondre("oups " + e) }

})



/** ***fin démettre****  **/
/** **retirer** */
zokou({ nomCom: "retirer", categorie: "Groupe", reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { ms, repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifAdmin, verifZokouAdmin, verifGroupe, utilisateur, mbre, nomAuteurMessage, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("Pour les groupe uniquement"); }


  const verifMember = (user) => {

    for (const m of membresGroupe) {
      if (m.id !== user) {
        continue;
      }
      else { return true }
      //membre=//(m.id==auteurMsgRepondu? return true) :false;
    }
  }

  const memberAdmin = (membresGroupe) => {
    let admin = [];
    for (m of membresGroupe) {
      if (m.admin == null) continue;
      admin.push(m.id);

    }
    // else{admin= false;}
    return admin;
  }

  const a = verifGroupe ? memberAdmin(membresGroupe) : '';


  let admin = verifGroupe ? a.includes(auteurMsgRepondu) : false;
  let membre = verifMember(auteurMsgRepondu)
  let autAdmin = verifGroupe ? a.includes(auteurMessage) : false;
  zkad = verifGroupe ? a.includes(idBot) : false;
  try {
    // repondre(verifZokouAdmin)

    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin == false) {
              const gifLink = "https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif"
              var sticker = new Sticker(gifLink, {
                pack: 'Zokou-Md', // The pack name
                author: nomAuteurMessage, // The author name
                type: StickerTypes.FULL, // The sticker type
                categories: ['🤩', '🎉'], // The sticker category
                id: '12345', // The sticker id
                quality: 50, // The quality of the output file
                background: '#000000'
              });

              await sticker.toFile("st.webp")
              var txt = `@${auteurMsgRepondu.split("@")[0]} a été rétiré du groupe..\n`
            /*  zk.sendMessage(dest, { sticker: fs.readFileSync("st.webp") }, { quoted: ms.message.extendedTextMessage.contextInfo.stanzaId})*/
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "remove");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })

            } else { repondre("Ce membre ne peut pas être rétirer car il est un  administrateur du groupe.") }

          } else { return repondre("Cet utilisateur ne fait pas partir du groupe."); }
        }
        else { return repondre("Désolé je ne peut pas effectuer cette action car je ne suis pas administrateur du groupe .") }

      } else { repondre("veuiller taguer le membre à rétirer"); }
    } else { return repondre("Désolé je ne peut pas effectuer cette action car vous n'êtes pas administrateur du groupe .") }
  } catch (e) { repondre("oups " + e) }

})


/** *****fin retirer */


zokou({ nomCom: "supp", categorie: "Groupe",reaction:"🧹" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe,auteurMsgRepondu,idBot, msgRepondu, verifAdmin, superUser, auteurMessage ,verifZokouAdmin} = commandeOptions;
  
  if (!msgRepondu) {
    repondre("Veuilez mentionner le Message à supprimer");
    return;
  }
  if(superUser)
  {
    
       if(auteurMsgRepondu==idBot)
       {
         const key={
            remoteJid:dest,
      fromMe: true,
      id: ms.message.extendedTextMessage.contextInfo.stanzaId,
         }
         await zk.sendMessage(dest,{delete:key});return;
       }
      else if(auteurMsgRepondu!=idBot && !verifGroupe)
       {
             try{
                        
            const key={
            remoteJid:dest,
      fromMe: false,
      id: ms.message.extendedTextMessage.contextInfo.stanzaId,
         }
         await zk.sendMessage(dest,{delete:key});return;
             }catch(erreur){repondre("oups une erreur lors de la suppression du message "+e)}
       }
  }

          if(verifGroupe)
          {
               if(verifAdmin || superUser)
               {
                    if(verifZokouAdmin)
                    {
                         try{
                        
            const key={
            remoteJid:dest,
      fromMe: false,
      id: ms.message.extendedTextMessage.contextInfo.stanzaId,
         }
         await zk.sendMessage(dest,{delete:key});return;
             }catch(erreur){repondre("oups une erreur lors de la suppression du message "+e)}
                    }
                      
               }else{repondre("Désolé je suis pas administrateur du groupe.")}
          }
});

zokou({ nomCom: "info", categorie: "Groupe" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe, verifZokouAdmin , mybotpic } = commandeOptions;
  if (!verifGroupe) { repondre("commande réservée au groupe uniquement"); return };

 try { ppgroup = await zk.profilePictureUrl(dest ,'image') ; } catch { ppgroup = mybotpic()}

    const info = await zk.groupMetadata(dest)

    /*console.log(metadata.id + ", title: " + metadata.subject + ", description: " + metadata.desc)*/


    let mess = {
      image: { url: ppgroup },
      caption:  `*━━━━『Info du groupe』━━━━*\n\n*🎐Nom:* ${info.subject}\n\n*🔩ID du Groupe:* ${dest}\n\n*🔍Desc:* \n\n${info.desc}`
    }


    zk.sendMessage(dest, mess, { quoted: ms })
  });



 //------------------------------------antilien-------------------------------

 zokou({ nomCom: "antilien", categorie: "Groupe", reaction: "🔗" }, async (dest, zk, commandeOptions) => {


  var { ms, repondre, arg, verifGroupe, auteurMessage, superUser, verifZokouAdmin, verifAdmin,prefixe, dev } = commandeOptions;
  

  
  if (!verifGroupe) {
    return repondre("*uniquement pour les groupes*");
  }
  
  if( superUser || verifAdmin) {
    const enetatoui = await verifierEtatJid(dest)
    try {
      if (!arg || !arg[0] || arg === ' ') { repondre('Voici une explication du fonctionnement de l\'antilien de zokou:\nPour activer l\'antilien , ajouter apres la commande "oui" ou "non";\nPour modifier l\'action de l\'antilien, tapez apres la commande action/"votre-action" ; les differentes actions sont supp ; warn et retirer') ; return};
     
      if(arg[0] === 'oui') {

      
       if(enetatoui ) { repondre("l'antilien est deja activer pour se groupe")
                    } else {
                  await ajouterOuMettreAJourJid(dest,"oui");
                
              repondre("l'antilien est activer avec succes") }
     
            } else if (arg[0] === "non") {

              if (enetatoui) { 
                await ajouterOuMettreAJourJid(dest , "non");

                repondre("L'antilien a été desactivé avec succes");
                
              } else {
                repondre("l'antilien n'est pas activer pour ce groupe");
              }
            } else if (arg.join('').split("/")[0] === 'action') {

               await mettreAJourAction(dest,arg.join('').split("/")[1]);

               repondre(`l'action de l'antilien a été actualisée sur ${arg.join('').split("/")[1]}`);
            

            } else repondre('Voici une expliction du fonctionnement de l\'antilien de zokou:\nPour activer l\'antilien , ajouter apres la commande "oui" ou "non";\nPour modifier l\'action de l\'antilien, tapez apres la commande action/"votre-action" ; les differentes actions sont supp ; warn et retirer')

      
    } catch (error) {
       repondre(error)
    }

  } else { repondre('Vous avez pas droit a cette commande')
  }

});




 //------------------------------------antibot-------------------------------

 zokou({ nomCom: "antibot", categorie: "Groupe", reaction: "🔗" }, async (dest, zk, commandeOptions) => {


  var { ms, repondre, arg, verifGroupe, auteurMessage, superUser, verifZokouAdmin, verifAdmin,prefixe, dev } = commandeOptions;
  

  
  if (!verifGroupe) {
    return repondre("*uniquement pour les groupes*");
  }
  
  if( superUser || verifAdmin) {
    const enetatoui = await atbverifierEtatJid(dest)
    try {
      if (!arg || !arg[0] || arg === ' ') { repondre('Voici une explication du fonctionnement de l\'antibot de zokou:\nPour activer l\'antibot , ajouter apres la commande "oui" ou "non";\nPour modifier l\'action de l\'antibot, tapez apres la commande action/"votre-action" ; les differentes actions sont supp ; warn et retirer') ; return};
     
      if(arg[0] === 'oui') {

      
       if(enetatoui ) { repondre("l'antibot est deja activer pour se groupe")
                    } else {
                  await atbajouterOuMettreAJourJid(dest,"oui");
                
              repondre("l'antibot est activer avec succes") }
     
            } else if (arg[0] === "non") {

              if (enetatoui) { 
                await atbajouterOuMettreAJourJid(dest , "non");

                repondre("L'antibot a été desactivé avec succes");
                
              } else {
                repondre("l'antibot n'est pas activer pour ce groupe");
              }
            } else if (arg.join('').split("/")[0] === 'action') {

               await atbmettreAJourAction(dest,arg.join('').split("/")[1]);

               repondre(`l'action de l'antibot a été actualisée sur ${arg.join('').split("/")[1]}`);
            

            } else repondre('Voici une explication du fonctionnement de l\'antibot de zokou:\nPour activer l\'antibot , ajouter apres la commande "oui" ou "non";\nPour modifier l\'action de l\'antibot, tapez apres la commande action/"votre-action" ; les differentes actions sont supp ; warn et retirer')

      
    } catch (error) {
       repondre(error)
    }

  } else { repondre('Vous avez pas droit a cette commande')
  }

});

//----------------------------------------------------------------------------

zokou({ nomCom: "groupe", categorie: "Groupe" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage, arg } = commandeOptions;

  if (!verifGroupe) { repondre("commande reserver au groupe uniquement"); return };
  if (!superUser || !verifAdmin) {
    repondre("commande reservée au admininistrateur");
    return;
  }
  if (!arg[0]) { repondre('Consigne :\n\nTaper groupe ouvrir ou fermer'); return; }
  const option = arg.join(' ')
  switch (option) {
    case "ouvrir":
      await zk.groupSettingUpdate(dest, 'not_announcement')
      repondre('Groupe Ouvert')
      break;
    case "fermer":
      await zk.groupSettingUpdate(dest, 'announcement');
      repondre('Groupe fermer avec succes');
      break;
    default: repondre("N'inventez pas d'option svp")
  }

});

zokou({ nomCom: "bye", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;
  if (!verifGroupe) { repondre("commande reserver au groupe uniquement"); return };
  if (!superUser) {
    repondre("commande reservée au proprietaire du bot");
    return;
  }
   repondre('sayonnara') ;
  await zk.groupLeave(dest)
});

zokou({ nomCom: "gnom", categorie: "Groupe" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;

  if (!verifAdmin) {
    repondre("commande reservée au admi,istrateurs du groupe");
    return;
  };
  if (!arg[0]) {
    repondre("Veiller entrer le nom du groupe svp");
    return;
  };
   const nom = arg.join(' ')
  await zk.groupUpdateSubject(dest, nom);
    repondre(`nom du groupe actualiser: *${nom}*`)

 
}) ;

zokou({ nomCom: "gdesc", categorie: "Groupe" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;

  if (!verifAdmin) {
    repondre("commande reservée au admi,istrateurs du groupe");
    return;
  };
  if (!arg[0]) {
    repondre("Veiller entrer la description du groupe svp");
    return;
  };
   const nom = arg.join(' ')
  await zk.groupUpdateDescription(dest, nom);
    repondre(`description  du groupe actualiser: *${nom}*`)

 
}) ;


zokou({ nomCom: "gpp", categorie: "Groupe" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;

  if (!verifAdmin) {
    repondre("commande reservée au admi,istrateurs du groupe");
    return;
  }; 
  if (msgRepondu.imageMessage) {
    const pp = await  zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;

    await zk.updateProfilePicture(dest, { url: pp })
                .then( res => {
                    zk.sendMessage(dest,{text:"Group pfp changed"})
                    fs.unlinkSync(pp)
                }).catch(() =>   zk.sendMessage(dest,{text:err})
)
        
  } else {
    repondre('Veiller mentionner une image svp')
  }

});

/////////////
zokou({nomCom:"annonce",categorie:"Groupe",reaction:"🎤"},async(dest,zk,commandeOptions)=>{


const {ms,repondre,msgRepondu,verifGroupe,prefixe,arg}=commandeOptions;


if(!verifGroupe){return repondre("Pour les groupes uniquement ⛔️");}

const infoGroupe=verifGroupe?await zk.groupMetadata(dest).catch((e)=>{console.log(e);}):"";


const membres =verifGroupe?infoGroupe.participants:{}

if(!msgRepondu && !arg.join(" "))
{
 // return repondre(`${prefixe}annonce Salut comment allez vous ?`);
  const txt =`${prefixe}annonce Salut comment allez vous ?`
  await zk.sendMessage(dest,{text:txt})
}

try{

           /*const isTextRpd=msgRepondu.extendedTextMessage?.text?true:false;

const textRpd =isTextRpd?msgRepondu.extendedTextMessage?.text:"";

const isVideoRpd =msgRepondu.videoMessage?true:false;
const videoRpd =isVideoRpd?await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage):null;


const titreVid =isVideoRpd?msgRepondu.videoMessage.caption:"";


const isImgRpd=msgRepondu.imageMessage?true:false;

const imgRpd=isImgRpd?await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage):null;

const titreImg=isImgRpd?msgRepondu.imageMessag.caption:"";*/

         if(msgRepondu)
            {

    /** *********^^^^^^^^^^^^/ *///////////////////////////////////////////
             
           const isTextRpd=msgRepondu.extendedTextMessage?.text?true:false;

const textRpd =isTextRpd?msgRepondu.extendedTextMessage?.text:"";

const isVideoRpd =msgRepondu.videoMessage?true:false;
const videoRpd =isVideoRpd?await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage):null;


const titreVid =isVideoRpd?msgRepondu.videoMessage.caption:"";


const isImgRpd=msgRepondu.imageMessage?true:false;

const imgRpd=isImgRpd?await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage):null;

const titreImg=isImgRpd?msgRepondu.imageMessage.caption:"";
              
      ////////////        

              

              
if(isImgRpd)
                  { 
                     await zk.sendMessage(dest,{image:{url:imgRpd},caption:titreImg,mentions:membres.map((i)=>i.id)},{quoted:ms})
                   }else    if(isVideoRpd)
{
     await zk.sendMessage(dest,   {video:  {url:videoRpd},caption:titreVid,mentions:membres.map((i)=>i.id)},{quoted:ms})  
}else if(isTextRpd)
{ 

  /*repondre(msgRepondu.extendedTextMessage?.text)*/
  
   await zk.sendMessage(dest,{text:textRpd,mentions:membres.map((i)=>i.id)})
}
            


}else if(arg.join(" "))
{ 
    const txt =arg.join(" ")
      await zk.sendMessage(dest,{text:txt,mentions:membres.map((i)=>i.id)})
} else { repondre("que dois-je annoncer svp") }


}catch(e){return repondre("oups une erreur : "+e);}


});

zokou({ nomCom: "antidemote", categorie: "Groupe", reaction: "🔗" }, async (dest, zk, commandeOptions) => {
    try {
        var { ms, repondre, auteurMessage, superUser, verifAdmin, verifGroupe, prefixe, arg, auteurMsgRepondu } = commandeOptions;

        if (!verifGroupe) {
            return repondre("Commande réservée aux groupes uniquement.");
        }

        if (!arg || arg.length === 0) {
            return repondre(`Voici comment utiliser l'antidemote:\nTapez ${prefixe}antidemote oui pour l'activer et ${prefixe}antidemote non pour le désactiver`);
        }

        const id = arg[0].toLowerCase();  // Convertir en minuscules pour éviter les problèmes de casse

        const membresGroupe = await infosGroupe.participants;
        const avoirAdmin = verifGroupe ? memberAdmin(membresGroupe) : '';
        const admin = avoirAdmin.includes(auteurMessage);
        let admin1 = verifGroupe ? avoirAdmin.includes(auteurMsgRepondu) : false;

        if (id === 'oui') {
            if (admin || superUser) {
                await repondre("Antidemote activé pour ce groupe.");
            } else {
                await repondre("Vous n'avez pas le droit d'activer l'antidemote pour ce groupe.");
            }
        } else if (id === 'non') {
            if (admin || superUser) {
                await repondre("Antidemote désactivé pour ce groupe.");
            } else {
                await repondre("Vous n'avez pas le droit de désactiver l'antidemote pour ce groupe.");
            }
        } else {
            await repondre(`Option non reconnue. Voici comment utiliser l'antidemote:\nTapez ${prefixe}antidemote oui pour l'activer et ${prefixe}antidemote non pour le désactiver`);
        }

        // Cette partie ne s'exécutera que si l'option est 'oui' et l'utilisateur a le droit d'activer l'antidemote
        if (id === 'oui' && admin1) {
            var txt = `@${auteurMsgRepondu.split("@")[0]} est toujours admin du groupe. 😜😜\n`;
            await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "promote");
            zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] });
        }
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
});
