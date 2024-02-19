const {zokou}=require("../framework/zokou")



zokou({nomCom:"voir",categorie:"Général",reaction:"🤲🏿"},async(dest,zk,commandeOptions)=>{

const {ms,msgRepondu,repondre}=commandeOptions;


if(!msgRepondu){return repondre("*Veuillez mentionner un message envoyé en vue unique* .");}


if(msgRepondu.viewOnceMessageV2)
{
      if(msgRepondu.viewOnceMessageV2.message.imageMessage)
       {
         var image =await zk.downloadAndSaveMediaMessage(msgRepondu.viewOnceMessageV2.message.imageMessage)
        var texte = msgRepondu.viewOnceMessageV2.message.imageMessage.caption
    
     await zk.sendMessage(dest,{image:{url:image},caption:texte},{quoted:ms})
      }else if(msgRepondu.viewOnceMessageV2.message.videoMessage){

    var video = await zk.downloadAndSaveMediaMessage(msgRepondu.viewOnceMessageV2.message.videoMessage)
var texte =msgRepondu.viewOnceMessageV2.message.videoMessage.caption


await zk.sendMessage(dest,{video:{url:video},caption:texte},{quoted:ms})

}
}else
{
   return repondre("Le message que vous avez mentionné n est pas un message envoyé en vue unique .")
}



})
