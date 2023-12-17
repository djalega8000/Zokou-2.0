const { zokou } = require("../framework/zokou");
const { getContentType } = require("@sampandey001/baileys");

zokou({ nomCom: "voir", categorie: "Général", reaction: "🤲🏿" }, async (dest, zk, commandeOptions) => {

  const { ms, msgRepondu, repondre } = commandeOptions;

  if (!msgRepondu) {
    return repondre("*Veuillez mentionner un message envoyé en vue unique* .");
  }

  if (msgRepondu.viewOnceMessageV2) {
    if (msgRepondu.viewOnceMessageV2.message.imageMessage) {
      var image = await zk.downloadAndSaveMediaMessage(msgRepondu.viewOnceMessageV2.message.imageMessage);
      var texte = msgRepondu.viewOnceMessageV2.message.imageMessage.caption;

      await zk.sendMessage(dest, { image: { url: image }, caption: texte }, { quoted: ms });
    } else if (msgRepondu.viewOnceMessageV2.message.videoMessage) {
      var video = await zk.downloadAndSaveMediaMessage(msgRepondu.viewOnceMessageV2.message.videoMessage);
      var texte = msgRepondu.viewOnceMessageV2.message.videoMessage.caption;

      await zk.sendMessage(dest, { video: { url: video }, caption: texte }, { quoted: ms });
     } else if (msgRepondu.viewOnceMessageV2.message.audioMessage) {
        var audio = await zk.downloadAndSaveMediaMessage(msgRepondu.viewOnceMessageV2.message.audioMessage);
        const filename = `${Math.random().toString(36)}`;
        let ran = `${filename}.mp3`;
        fs.unlinkSync(audio); // Suppression du fichier audio
        let buff1 = fs.readFileSync(ran);
        await zk.sendMessage(
          dest,
          { audio: buff1, mimetype: "audio/mpeg" },
          { quoted: ms }
        );
        fs.unlinkSync(ran); 
    } else {
      return repondre("Le message que vous avez mentionné n'est pas un message envoyé en vue unique.");
    }
  }
});
