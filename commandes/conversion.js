const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { zokou } = require("../framework/zokou");
const traduire = require("../framework/traduction");
const { downloadMediaMessage,downloadContentFromMessage } =  require('@whiskeysockets/baileys');
const fs = require("fs-extra") ;
const axios = require('axios');  
const FormData = require('form-data');
const { exec } = require("child_process");



zokou({nomCom:"sticker",categorie: "Conversion", reaction: "👨🏿‍💻"},async(origineMessage,zk,commandeOptions)=>{

let {ms,mtype,arg,repondre,nomAuteurMessage}=commandeOptions
  var txt=JSON.stringify(ms.message)

  var mime=mtype === "imageMessage" || mtype === "videoMessage";
  var tagImage = mtype==="extendedTextMessage" && txt.includes("imageMessage")
  var tagVideo = mtype==="extendedTextMessage" && txt.includes("videoMessage")

const alea = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;};


  const stickerFileName = alea(".webp");


            // image
  if (mtype === "imageMessage" ||tagImage) {
    let downloadFilePath;
    if (ms.message.imageMessage) {
      downloadFilePath = ms.message.imageMessage;
    } else {
      // image mentionnée
      downloadFilePath =
        ms.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
    }
    // images
    const media = await downloadContentFromMessage(downloadFilePath, "image");
    let buffer = Buffer.from([]);
    for await (const elm of media) {
      buffer = Buffer.concat([buffer, elm]);
    }

    sticker = new Sticker(buffer, {
      pack:"Zokou-Md" ,
      author: nomAuteurMessage,
      type:
        arg.includes("crop") || arg.includes("c")
          ? StickerTypes.CROPPED
          : StickerTypes.FULL,
      quality: 100,
    });
  } else if (mtype === "videoMessage" || tagVideo) {
    // videos
    let downloadFilePath;
    if (ms.message.videoMessage) {
      downloadFilePath = ms.message.videoMessage;
    } else {
      downloadFilePath =
        ms.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage;
    }
    const stream = await downloadContentFromMessage(downloadFilePath, "video");
    let buffer = Buffer.from([]);
    for await (const elm of stream) {
      buffer = Buffer.concat([buffer, elm]);
    }

    sticker = new Sticker(buffer, {
      pack:"Zokou-Md", // pack stick
      author:  nomAuteurMessage, // nom de l auteur du stick
      type:
        arg.includes("-r") || arg.includes("-c")
          ? StickerTypes.CROPPED
          : StickerTypes.FULL,
      quality: 40,
    });
  } else {
    repondre("Veuillez mentionné une image ou une vidéo!");
    return;
  }

  await sticker.toFile(stickerFileName);
  await zk.sendMessage(
    origineMessage,
    {
      sticker: fs.readFileSync(stickerFileName),
    },
    { quoted: ms }
  );

try{
  fs.unlinkSync(stickerFileName)
}catch(e){console.log(e)}





  
});

zokou({nomCom:"scrop",categorie: "Conversion", reaction: "👨🏿‍💻"},async(origineMessage,zk,commandeOptions)=>{
   const {ms , msgRepondu,arg,repondre,nomAuteurMessage} = commandeOptions ;

  if(!msgRepondu) { repondre( 'veiller mentionner le media' ) ; return } ;
  if(!(arg[0])) {
       pack = nomAuteurMessage
  } else {
    pack = arg.join(' ')
  } ;
  if (msgRepondu.imageMessage) {
     mediamsg = msgRepondu.imageMessage
  } else if(msgRepondu.videoMessage) {
mediamsg = msgRepondu.videoMessage
  } 
   else {
    repondre('Euh un media svp'); return
  } ;

  var stick = await zk.downloadAndSaveMediaMessage(mediamsg)

     let stickerMess = new Sticker(stick, {
            pack: pack,
            
            type: StickerTypes.CROPPED,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer2 = await stickerMess.toBuffer();
          zk.sendMessage(origineMessage, { sticker: stickerBuffer2 }, { quoted: ms });

});

zokou({nomCom:"jeprend",categorie: "Conversion", reaction: "👨🏿‍💻"},async(origineMessage,zk,commandeOptions)=>{
   const {ms , msgRepondu,arg,repondre,nomAuteurMessage} = commandeOptions ;

  if(!msgRepondu) { repondre( 'veiller mentionner le media' ) ; return } ;
  if(!(arg[0])) {
       pack = nomAuteurMessage
  } else {
    pack = arg.join(' ')
  } ;
  if (msgRepondu.imageMessage) {
     mediamsg = msgRepondu.imageMessage
  } else if(msgRepondu.videoMessage) {
mediamsg = msgRepondu.videoMessage
  } 
  else if (msgRepondu.stickerMessage) {
    mediamsg = msgRepondu.stickerMessage ;
  } else {
    repondre('Euh un media svp'); return
  } ;

  var stick = await zk.downloadAndSaveMediaMessage(mediamsg)

     let stickerMess = new Sticker(stick, {
            pack: pack,
            
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer2 = await stickerMess.toBuffer();
          zk.sendMessage(origineMessage, { sticker: stickerBuffer2 }, { quoted: ms });

});



zokou({ nomCom: "ecrire", categorie: "Conversion", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
  const { ms, msgRepondu, arg, repondre, nomAuteurMessage } = commandeOptions;

  if (!msgRepondu) {
    repondre('Veuillez mentionner une image');
    return;
  }

  if (!msgRepondu.imageMessage) {
    repondre('La commande ne fonctionne qu\'avec des images');
    return;
  } ;
  text = arg.join(' ') ;
  
  if(!text || text === null) {repondre('Veiller inserer un texte') ; return } ;
 
  
  const mediamsg = msgRepondu.imageMessage;
  const image = await zk.downloadAndSaveMediaMessage(mediamsg);

  // Créer un objet FormData
  const data = new FormData();
  data.append('image', fs.createReadStream(image));

  // Configurer les en-têtes
  const clientId = 'b40a1820d63cd4e'; // Remplacez par votre client ID Imgur
  const headers = {
    'Authorization': `Client-ID ${clientId}`,
    ...data.getHeaders()
  };

  // Configurer la requête
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.imgur.com/3/image',
    headers: headers,
    data: data
  };

  try {
    const response = await axios(config);
    const imageUrl = response.data.data.link;
    console.log(imageUrl)

    // Utiliser imageUrl comme vous le souhaitez (création de mème, etc.)
    const meme = `https://api.memegen.link/images/custom/-/${text}.png?background=${imageUrl}`;

    // Créer le sticker
    const stickerMess = new Sticker(meme, {
      pack: nomAuteurMessage,
      author: 'Zokou-Md',
      type: StickerTypes.FULL,
      categories: ["🤩", "🎉"],
      id: "12345",
      quality: 70,
      background: "transparent",
    });

    const stickerBuffer2 = await stickerMess.toBuffer();
    zk.sendMessage(
      origineMessage,
      { sticker: stickerBuffer2 },
      { quoted: ms }
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi sur Imgur :', error);
    repondre('Une erreur est survenue lors de la création du mème.');
  }
});

/* zokou({nomCom:"url",categorie: "Conversion", reaction: "👨🏿‍💻"},async(origineMessage,zk,commandeOptions)=>{
   const {ms , msgRepondu,arg,repondre,nomAuteurMessage} = commandeOptions ;

  if(!msgRepondu) { repondre( 'veiller mentionner le media' ) ; return } ;
 
  if (msgRepondu.imageMessage) {
     mediamsg = msgRepondu.imageMessage

     const image = await zk.downloadAndSaveMediaMessage(mediamsg);

  // Créer un objet FormData
  const data = new FormData();
  data.append('image', fs.createReadStream(image));

  // Configurer les en-têtes
  const clientId = 'b40a1820d63cd4e'; // Remplacez par votre client ID Imgur
  const headers = {
    'Authorization': `Client-ID ${clientId}`,
    ...data.getHeaders()
  };

  // Configurer la requête
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.imgur.com/3/image',
    headers: headers,
    data: data
  };

    const response = await axios(config);
    const imageUrl = response.data.data.link;
    console.log(imageUrl) ;

       repondre(imageUrl)
    
  } else if(msgRepondu.videoMessage) {
mediamsg = msgRepondu.videoMessage
     repondre('commande non achever') ; return
  }  
  else if (msgRepondu.stickerMessage) {
    mediamsg = msgRepondu.stickerMessage ;
    repondre('commande non achever') ; return
  } else {
    repondre('Euh un media svp'); return
  } ; 


      
                  } ); */

zokou({nomCom:"photo",categorie: "Conversion", reaction: "👨🏿‍💻"},async(dest,zk,commandeOptions)=>{
   const {ms , msgRepondu,arg,repondre,nomAuteurMessage} = commandeOptions ;

  if(!msgRepondu) { repondre( 'veiller mentionner le media' ) ; return } ;
 
   if (!msgRepondu.stickerMessage) {
      repondre('Euh mentionner un sticker non-animé'); return
  } ;

 let mediaMess = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);

  const alea = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;};
  
  let ran = await alea(".png");

  
        exec(`ffmpeg -i ${mediaMess} ${ran}`, (err) => {
          fs.unlinkSync(mediaMess);
          if (err) {
            zk.sendMessage(
              dest,
              {
                text: 'Un sticker non animé svp',
              },
              { quoted: ms }
            );
            return;
          }
          let buffer = fs.readFileSync(ran);
          zk.sendMessage(
            dest,
            { image: buffer },
            { quoted: ms }
          );
          fs.unlinkSync(ran);
        });
});

async function uploadToTelegraph(Path) {
    if (!fs.existsSync(Path)) {
        throw new Error("Fichier non existant");
    }

    try {
        const form = new FormData();
        form.append("file", fs.createReadStream(Path));

        const { data } = await axios.post("https://telegra.ph/upload", form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        if (data && data[0] && data[0].src) {
            return "https://telegra.ph" + data[0].src;
        } else {
            throw new Error("Erreur lors de la récupération du lien de la vidéo");
        }
    } catch (err) {
        throw new Error(String(err));
    }
}

zokou({ nomCom: "url", categorie: "Conversion", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
    const { msgRepondu, repondre } = commandeOptions;

    if (!msgRepondu) {
        repondre('Veuillez mentionner une vidéo ou une image.');
        return;
    }

    let mediaPath;

    if (msgRepondu.videoMessage) {
        mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
    } else if (msgRepondu.imageMessage) {
        mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
    } else {
        repondre('Veuillez mentionner une vidéo ou une image.');
        return;
    }

    try {
        const telegraphUrl = await uploadToTelegraph(mediaPath);
        fs.unlinkSync(mediaPath);  // Supprime le fichier après utilisation

        repondre(telegraphUrl);
    } catch (error) {
        console.error('Erreur lors de la création du lien Telegraph :', error);
        repondre('Erreur lors de la création du lien Telegraph.');
    }
});


zokou({ nomCom: "trd", categorie: "Conversion", reaction: "👨🏿‍💻" }, async (dest, zk, commandeOptions) => {

  const { msgRepondu, repondre , arg } = commandeOptions;

  
   if(msgRepondu) {
     try {
      
     

       if(!arg || !arg[0]) { repondre('indiquer le language dans lequel vous voulez traduire (ex :  fr , en)') ; return }
   

         let texttraduit = await traduire(msgRepondu.conversation , {to : arg[0]}) ;

         repondre(texttraduit)

        } catch (error) {
          
          repondre('Mentionner un message texte') ;
      
        }

   } else {
     
     repondre('Mentionner le message texte a traduire')
   }



})