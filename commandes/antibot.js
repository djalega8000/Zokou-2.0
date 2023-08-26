const { zokou } = require("../framework/zokou")
//const { getGroupe } = require("../bdd/groupe")
const { ajouterGroupe ,getGroupe,ajouterAction,getAntibot,ajouterAntibot} = require("../bdd")
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const fs = require("fs-extra")



zokou({nomCom:"antibot",categorie:"Groupe"},async(dest,zk,commandeOptions)=>{

  let {repondre,arg,ms,prefixe,dev,superUser,verifAdmin,verifZokouAdmin,verifGroupe}=commandeOptions;

  if(!verifGroupe)
  {repondre("Pour les groupes uniquement .");return;}
  const args = arg.join(" ");

  const demandeAntibot =async(f)=>
    {
      /*var txt ="https://replit.com/join/epezjbvype-murnoire"
      await zk.sendMessage(zk.user.id,{text:txt+"\n c' est l invite de zokou2.0"});*/
      var resultat;
      var donnees = await getAntibot(f);
           for(var a=0;a<donnees.length;a++)
             {    
              // console.log("Les donnees "+JSON.stringify(donnees));
                if(donnees[a].groupejid===f){resultat=donnees[a].etat;}
                
             }
      return resultat;
    }

  var req=await demandeAntibot(dest);

              try{

                   if (!arg || arg == "") {
      repondre(`*Exemple : * ${prefixe}antibot oui (pour activer l'antibot) ou ${prefixe}antibot non (pour désactiver l antibot )`);return;
    }
                if(args==="oui")
                {
                  if(!dev){
                       if(!verifAdmin)
                   {
                         repondre("Désolé vous ne pouvez pas activer l'antibot car vous n'êtes pas un administrateur du groupe .");return;
                   }else{

                           if(!dev){
                                        if(verifZokouAdmin)
                                        {
                                          if(req=="oui")
                                          {repondre("L'antibot est déja activé pour ce groupe . "); return;}else{await ajouterAntibot(dest,args);repondre("Antibot activé avec succès !")}
                                        }else{repondre("Désolé je ne peux pas activer l'antibot car je ne suis pas administrateur du groupe .")}
                           }else{

                                        if(req=="oui")
                                          {repondre("L'antibot est déja activé pour ce groupe . "); return;}else{await ajouterAntibot(dest,args);repondre("Antibot activé avec succès !")}
                           }
                   }}else{if(req=="oui")
                                          {repondre("L'antibot est déja activé pour ce groupe . "); return;}else{await ajouterAntibot(dest,args);repondre("Antibot activé avec succès !")}}
                }else if(args=="non")
                {
                     if(!dev)
                     {
                                       if(!verifAdmin)
                   {
                         repondre("Désolé vous ne pouvez pas désactiver l'antibot car vous n'êtes pas un administrateur du groupe .");return;
                   }else{

                           if(!dev){
                                        if(verifZokouAdmin)
                                        {
                                          if(req=="non")
                                          {repondre("L'antibot est déja désactivé pour ce groupe . "); return;}else{await ajouterAntibot(dest,args);repondre("Antibot désactivé avec succès !")}
                                        }else{repondre("Désolé je ne peux pas désactiver l'antibot car je ne suis pas administrateur du groupe .")}
                           }else{

                                        if(req=="non")
                                          {repondre("L'antibot est déja désactivé pour ce groupe . "); return;}else{await ajouterAntibot(dest,args);repondre("Antibot désactivé avec succès !")}
                           }
                   }}else{if(req=="non")
                                          {repondre("L'antibot est déja désactivé pour ce groupe . "); return;}else{await ajouterAntibot(dest,args);repondre("Anti-bot désactivé avec succès !")}}
                }else if(args="état"||args=="etat")
                {
                      /*  req=="oui"?${repondre("*Etat anti-bot :* \n L'anti-bot est activé pour ce groupe");return;}: req=="non"?${repondre("*Etat anti-bot :* \n L'anti-bot est désactivé pour ce groupe");return;}:"";*/
                }
              //////////////////     
                
              }catch(e){}
  
})