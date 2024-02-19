const { zokou } = require("../framework/zokou");
//const { getGroupe } = require("../bdd/groupe");
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const {ajouterOuMettreAJourJid,mettreAJourAction,verifierEtatJid} = require("../bdd/antilien");
const {atbajouterOuMettreAJourJid,atbverifierEtatJid,atbmettreAJourAction} = require("../bdd/antibot");
const { search, download } = require("aptoide-scraper");
const axios = require('axios');
const fs = require("fs-extra");
//const { uploadImageToImgur } = require('../framework/imgur');
const { recupevents } = require('../bdd/welcome');
const {exec}=require("child_process") ;


zokou({ nomCom: "appel", categorie: "Groupe", reaction: "📣" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions


 

  if (!verifGroupe) { repondre("✋🏿 ✋🏿cette commande est réservée aux groupes ❌"); return; }
  if (!arg || arg === ' ') {
  mess = 'Aucun Message'
  } else {
    mess = arg.join(' ')
  } ;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  var tag = ""; 
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
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("Pour les groupe uniquement"); }

  const met = await zk.groupMetadata(dest) ;

  if(await recupevents(dest,'antipromote') == 'oui' && (met.author =! auteurMessage) )  { repondre('Vous avez pas droit de Nommer des participants car le antipromote est actif') ; return} ;


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
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("Pour les groupe uniquement"); }

  const met = await zk.groupMetadata(dest) ;

  if(await recupevents(dest,'antidemote') == 'oui' && (met.author =! auteurMessage) )  { repondre('Vous avez pas droit de denommer des participants car le antidemote est actif') ; return} ;


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
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, nomAuteurMessage, auteurMessage, superUser, idBot } = commandeOptions;
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

  const { ms, repondre, verifGroupe,auteurMsgRepondu,idBot, msgRepondu, verifAdmin, superUser} = commandeOptions;
  
  if (!msgRepondu) {
    repondre("Veuilez mentionner le Message à supprimer");
    return;
  }
  if(superUser && auteurMsgRepondu==idBot )
  {
    
       if(auteurMsgRepondu==idBot)
       {
         const key={
            remoteJid:dest,
      fromMe: true,
      id: ms.message.extendedTextMessage.contextInfo.stanzaId,
         }
         await zk.sendMessage(dest,{delete:key});return;
       } /*
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
       } */
  }

          if(verifGroupe)
          {
               if(verifAdmin || superUser)
               {
                    
                         try{
                
                         
                         
                          
            // console.log(ms.message.extendedTextMessage.contextInfo.stanzaId)  ;         
            const key=   {
               remoteJid : dest,
               id : ms.message.extendedTextMessage.contextInfo.stanzaId ,
               fromMe : false,
               participant : ms.message.extendedTextMessage.contextInfo.participant

            }         // await getMessageKeyByStanzaIdAndJid('./store.json', ms.message.extendedTextMessage.contextInfo.stanzaId,dest)
          //  console.log(key);
         
         await zk.sendMessage(dest,{delete:key});return;

             }catch(e){repondre("J'ai besoins des droit d'administration")}
                    
                      
               }else{repondre("Désolé vous n'etes pas administrateur du groupe.")}
          }
});

zokou({ nomCom: "info", categorie: "Groupe" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe, mybotpic } = commandeOptions;
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


  var { repondre, arg, verifGroupe, superUser, verifAdmin } = commandeOptions;
  

  
  if (!verifGroupe) {
    return repondre("*uniquement pour les groupes*");
  }
  
  if( superUser || verifAdmin) {
    const enetatoui = await verifierEtatJid(dest)
    try {
      if (!arg || !arg[0] || arg === ' ') { repondre("*antilien oui* pour activer l'antilien\n*antilien non* pour desactiver l'antilien\n*antilien action/retier* pour retirer retirer directement sans preavis\n*antilien action/warn* pour donner des avertissement\n*antilien action/supp* pour supprimer uniquement le lien sans toutes fois sanctionner\n\nNotez que par defaut l'antilien est reglé sur supp") ; return};
     
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

                let action = (arg.join('').split("/")[1]).toLowerCase() ;

              if ( action == 'retirer' || action == 'warn' || action == 'supp' ) {

                await mettreAJourAction(dest,action);

                repondre(`l'action de l'antilien a été actualisée sur ${arg.join('').split("/")[1]}`);

              } else {
                  repondre('Les seuls action sont *warn* ; *supp* et *retirer*')
              }
               

               
            

            } else { repondre("*antilien oui* pour activer l'antilien\n*antilien non* pour desactiver l'antilien\n*antilien action/retier* pour retirer retirer directement sans preavis\n*antilien action/warn* pour donner des avertissement\n*antilien action/supp* pour supprimer uniquement le lien sans toutes fois sanctionner\n\nNotez que par defaut l'antilien est reglé sur supp") }

      
    } catch (error) {
       repondre(error)
    }

  } else { repondre('Vous avez pas droit a cette commande')
  }

});




 //------------------------------------antibot-------------------------------

 zokou({ nomCom: "antibot", categorie: "Groupe", reaction: "🔗" }, async (dest, zk, commandeOptions) => {


  var { repondre, arg, verifGroupe, superUser, verifAdmin } = commandeOptions;
  

  
  if (!verifGroupe) {
    return repondre("*uniquement pour les groupes*");
  }
  
  if( superUser || verifAdmin) {
    const enetatoui = await atbverifierEtatJid(dest)
    try {
      if (!arg || !arg[0] || arg === ' ') { repondre("*antibot oui* pour activer l'antibot\n*antibot non* pour desactiver l'antibot\n*antibot action/retier* pour retirer retirer directement sans preavis\n*antibot action/warn* pour donner des avertissement\n*antibot action/supp* pour supprimer uniquement le message du bot sans toutes fois sanctionner\n\nNotez que par defaut l'antibot est reglé sur supp") ; return};
     
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

              let action = (arg.join('').split("/")[1]).toLowerCase() ;

              if ( action == 'retirer' || action == 'warn' || action == 'supp' ) {

                await mettreAJourAction(dest,action);

                repondre(`l'action de l'antibot a été actualisée sur ${arg.join('').split("/")[1]}`);

              } else {
                  repondre('Les seuls action sont *warn* ; *supp* et *retirer*')
              }

         

            } else repondre("*antibot oui* pour activer l'antibot\n*antibot non* pour desactiver l'antibot\n*antibot action/retier* pour retirer  directement sans preavis\n*antibot action/warn* pour donner des avertissement\n*antibot action/supp* pour supprimer uniquement le message du bot sans toutes fois sanctionner\n\nNotez que par defaut l'antibot est reglé sur supp")

      
    } catch (error) {
       repondre(error)
    }

  } else { repondre('Vous avez pas droit a cette commande')
  }

});

//----------------------------------------------------------------------------

zokou({ nomCom: "groupe", categorie: "Groupe" }, async (dest, zk, commandeOptions) => {

  const { repondre, verifGroupe, verifAdmin, superUser, arg } = commandeOptions;

  if (!verifGroupe) { repondre("commande reserver au groupe uniquement"); return };
  if (superUser || verifAdmin) {
   
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
    
  } else {repondre('Vous avez pas droit a cette commande')}
  

});

zokou({ nomCom: "bye", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { repondre, verifGroupe, superUser } = commandeOptions;
  if (!verifGroupe) { repondre("commande reserver au groupe uniquement"); return };
  if (!superUser) {
    repondre("commande reservée au proprietaire du bot");
    return;
  }
   repondre('sayonnara') ;
  await zk.groupLeave(dest)
});

zokou({ nomCom: "gnom", categorie: "Groupe" }, async (dest, zk, commandeOptions) => {

  const { arg, repondre, verifAdmin } = commandeOptions;

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

  const { arg, repondre, verifAdmin } = commandeOptions;

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

  const { repondre, msgRepondu, verifAdmin } = commandeOptions;

  if (!verifAdmin) {
    repondre("commande reservée au admi,istrateurs du groupe");
    return;
  }; 
  if (msgRepondu.imageMessage) {
    const pp = await  zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;

    await zk.updateProfilePicture(dest, { url: pp })
                .then( () => {
                    zk.sendMessage(dest,{text:"Group pfp changed"})
                    fs.unlinkSync(pp)
                }).catch(() =>   zk.sendMessage(dest,{text:err})
)
        
  } else {
    repondre('Veiller mentionner une image svp')
  }

});

/////////////
/* zokou({nomCom:"annonce",categorie:"Groupe",reaction:"🎤"},async(dest,zk,commandeOptions)=>{


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

const titreImg=isImgRpd?msgRepondu.imageMessag.caption:"";****

         if(msgRepondu)
            {

    /** *********^^^^^^^^^^^^/ ///////////////////////////////////////////
             
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

  /*repondre(msgRepondu.extendedTextMessage?.text) ****
  
   await zk.sendMessage(dest,{text:textRpd,mentions:membres.map((i)=>i.id)})
}
            


}else if(arg.join(" "))
{ 
    const txt =arg.join(" ")
      await zk.sendMessage(dest,{text:txt,mentions:membres.map((i)=>i.id)})
} else { repondre("que dois-je annoncer svp") }


}catch(e){return repondre("oups une erreur : "+e);}


});
 */


zokou({nomCom:"annonce",categorie:"Groupe",reaction:"🎤"},async(dest,zk,commandeOptions)=>{


  const {repondre,msgRepondu,verifGroupe,arg ,verifAdmin , superUser}=commandeOptions;

  if(!verifGroupe)  { repondre('Cette commande n\' est possible que dans les groupes ')} ;
  if (verifAdmin || superUser) { 

  let metadata = await zk.groupMetadata(dest) ;

  //console.log(metadata.participants)
 let tag = [] ;
  for (const participant of metadata.participants ) {

      tag.push(participant.id) ;
  }
  //console.log(tag)

    if(msgRepondu) {
      console.log(msgRepondu)
      let msg ;

      if (msgRepondu.imageMessage) {

        

     let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;
     // console.log(msgRepondu) ;
     msg = {

       image : { url : media } ,
       caption : msgRepondu.imageMessage.caption,
       mentions :  tag
       
     }
    

      } else if (msgRepondu.videoMessage) {

        let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage) ;

        msg = {

          video : { url : media } ,
          caption : msgRepondu.videoMessage.caption,
          mentions :  tag
          
        }

      } else if (msgRepondu.audioMessage) {
    
        let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage) ;
       
        msg = {
   
          audio : { url : media } ,
          mimetype:'audio/mp4',
          mentions :  tag
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
       
        msg = { sticker: stickerBuffer2 , mentions : tag}


      }  else {
          msg = {
             text : msgRepondu.conversation,
             mentions : tag
          }
      }

    zk.sendMessage(dest,msg)

    } else {

        if(!arg || !arg[0]) { repondre('Entrez le texte a annoncer ou mentionner le message a annoncer') ; return} ;

      zk.sendMessage(
         dest,
         {
          text : arg.join(' ') ,
          mentions : tag
         }     
      )
    }

} else {
  repondre('Commande reservée au admins')
}
});


zokou({ nomCom: "apk", reaction: "✨", categorie: "Recherche" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    const appName = arg.join(' ');
    if (!appName) {
      return repondre("*Entrer le nom de l'application à rechercher*");
    }

    const searchResults = await search(appName);

    if (searchResults.length === 0) {
      return repondre("*Application non existante, veuillez entrer un autre nom*");
    }

    const appData = await download(searchResults[0].id);
    const fileSize = parseInt(appData.size);

    if (fileSize > 300) {
      return repondre("Le fichier dépasse 300 Mo, impossible de le télécharger.");
    }

    const downloadLink = appData.dllink;
    const captionText =
      "『 *Zokou-Md App* 』\n\n*Nom :* " + appData.name +
      "\n*Id :* " + appData["package"] +
      "\n*Dernière MAJ :* " + appData.lastup +
      "\n*Taille :* " + appData.size +
      "\n";

    const apkFileName = (appData?.["name"] || "Downloader") + ".apk";
    const filePath = apkFileName;

    const response = await axios.get(downloadLink, { 'responseType': "stream" });
    const fileWriter = fs.createWriteStream(filePath);
    response.data.pipe(fileWriter);

    await new Promise((resolve, reject) => {
      fileWriter.on('finish', resolve);
      fileWriter.on("error", reject);
    });

    const documentMessage = {
      'document': fs.readFileSync(filePath),
      'mimetype': 'application/vnd.android.package-archive',
      'fileName': apkFileName
    };

    // Utilisation d'une seule méthode sendMessage pour envoyer l'image et le document
    zk.sendMessage(dest, { image: { url: appData.icon }, caption: captionText }, { quoted: ms });
    zk.sendMessage(dest, documentMessage, { quoted: ms });

    // Supprimer le fichier après envoi
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error('Erreur lors du traitement de la commande apk:', error);
    repondre("*Erreur lors du traitement de la commande apk*");
  }
});



/*******************************  automute && autoummute ***************************/

const cron = require(`../bdd/cron`) ;


zokou({
      nomCom : 'automute',
      categorie : 'Groupe'
  } , async (dest,zk,commandeOptions) => {

      const {arg , ms , repondre , verifAdmin , superUser } = commandeOptions ;

      if (!verifAdmin) { repondre('Vous n\'etes pas administrateur du groupe') ; return}

      group_cron = await cron.getCronById(dest) ;
      
     

      if (!arg || arg.length == 0) {

        let state ;
        if (group_cron == null || group_cron.mute_at == null) {
  
            state = "Aucune heure regler pour l'automute "
        } else {
  
          state = `Le groupe se fermera a ${(group_cron.mute_at).split(':')[0]}H ${(group_cron.mute_at).split(':')[1]}`
        }
  
        let msg = `* *Etat :* ${state}
* *Consigne :* Pour Activer l'automute , ajoutez apres la commande la minute et l'heure separes par ':'
Exemple automute 9:30
* Pour supprimer l'automute utilisez la commande *automute supp*`

          repondre(msg) ;
          return ;
      } else {

        let texte = arg.join(' ')

        if (texte.toLowerCase() === `supp` ) { 

          if (group_cron == null) {

              repondre('Aucun cronometrage est actif') ;
          } else {

              await cron.delCron(dest) ;

              repondre("L'automute a ete supprimer ; redemarrage pour appliquer les changements") 
              .then(() => {

                exec("pm2 restart all");
              }) ;
          }
        } else if (texte.includes(':')) {

          //let { hr , min } = texte.split(':') ;

          await cron.addCron(dest,"mute_at",texte) ;

          repondre(`etablissement d'un automute pour ${texte} ; redemarrage pour appliquer les changements`) 
          .then(() => {

            exec("pm2 restart all");
          }) ;

        } else {
            repondre('Veuillez entrer une heure valide avec l\'heure et la minute separer par :') ;
        }


      }
  });


  zokou({
    nomCom : 'autounmute',
    categorie : 'Groupe'
} , async (dest,zk,commandeOptions) => {

    const {arg , ms , repondre , verifAdmin , superUser } = commandeOptions ;

    if (!verifAdmin) { repondre('Vous n\'etes pas administrateur du groupe') ; return}

    group_cron = await cron.getCronById(dest) ;
    
   

    if (!arg || arg.length == 0) {

      let state ;
      if (group_cron == null || group_cron.unmute_at == null) {

          state = "Aucune heure regler pour l'autounmute "
      } else {

        state = `Le groupe s'ouvrira a ${(group_cron.unmute_at).split(':')[0]}H ${(group_cron.unmute_at).split(':')[1]}`
      }

      let msg = `* *Etat :* ${state}
* *Consigne :* Pour Activer l'autounmute , ajoutez apres la commande la minute et l'heure separes par ':'
Exemple l'autounmute 7:30
* Pour supprimer l'autounmute utilisez la commande *autounmute supp*`

        repondre(msg) ;
        return ;

    } else {

      let texte = arg.join(' ')

      if (texte.toLowerCase() === `supp` ) { 

        if (group_cron == null) {

            repondre('Aucun cronometrage a ete active') ;
        } else {

            await cron.delCron(dest) ;

            repondre("L'autounmute a ete supprimer ; redemarrage pour appliquer les changements")
            .then(() => {

              exec("pm2 restart all");
            }) ;

            

        }
      } else if (texte.includes(':')) {

       

        await cron.addCron(dest,"unmute_at",texte) ;

        repondre(`etablissement d'un autounmute pour ${texte} ; redemarrage pour appliquer les changements`)
        .then(() => {

          exec("pm2 restart all");
        }) ;

      } else {
          repondre('Veuillez entrer une heure valide avec l\'heure et la minute separer par :') ;
      }


    }
});



zokou({
  nomCom : 'fkick',
  categorie : 'Groupe'
} , async (dest,zk,commandeOptions) => {

  const {arg , ms , repondre , verifAdmin , superUser , verifZokouAdmin } = commandeOptions ;

  if (verifAdmin || superUser) {

    if(!verifZokouAdmin){ repondre('Vous j\'ai besoin des droits d\'adiministration pour effectuer cette commande') ; return ;}

    if (!arg || arg.length == 0) { repondre('Veuillez entrer l\'indicatif du pays dont les membres seront retirer') ; return ;}

      let metadata = await zk.groupMetadata(dest) ;

      let participants = metadata.participants ;

      for (let i = 0 ; i < participants.length ; i++) {

          if (participants[i].id.startsWith(arg[0]) && participants[i].admin === null ) {

             await zk.groupParticipantsUpdate(dest, [participants[i].id], "remove") ;
          }
      }

  } else {
    repondre('Gomen vous etes pas administrateurs du groupe')
  }


}) ;


zokou({
      nomCom : 'nsfw',
      categorie : 'Groupe'
}, async (dest,zk,commandeOptions) => {
  
    const {arg , ms , repondre , verifAdmin , superUser } = commandeOptions ;

  if(!verifAdmin) { repondre('Desoler vous pouvez pas autoriser les contenues nsfw sans etre administrateur du groupe') ; return}

      let hbd = require('../bdd/hentai') ;

    let isHentaiGroupe = await hbd.checkFromHentaiList(dest) ;

  if (arg[0] == 'on') {
    
       if(isHentaiGroupe) {repondre('Les nsfw sont deja actifs pour se groupe') ; return} ;

      await hbd.addToHentaiList(dest) ;

      repondre('Les nsfw sont desormais actifs pour se groupe') ;
       
  } else if (arg[0] == 'off') {

     if(!isHentaiGroupe) {repondre('Les nsfw sont deja desactives pour se groupe') ; return} ;

      await hbd.removeFromHentaiList(dest) ;

      repondre('Les nsfw sont desormais desactives pour se groupe') ;
  } else {

      repondre('Vous devez mettre "on" ou "off"') ;

  }
} ) ;