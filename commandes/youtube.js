const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');
const yt=require("../framework/dl/ytdl-core.js")
const ffmpeg = require("fluent-ffmpeg");
const yts1 = require("youtube-yts");
//var fs =require("fs-extra")

zokou({
  nomCom: "song",
  categorie: "Recherche",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("Veuillez entrer un terme de recherche s'il vous plaît.");
    return;
  }

  try {
    let topo = arg.join(" ")
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const urlElement = videos[0].url;
          
       let infoMess = {
          image: {url : videos[0]. thumbnail},
         caption : `\n*nom de l'audio :* _${videos[0].title}_

*Durée :* _${videos[0].timestamp}_

*Lien :* _${videos[0].url}_


_*En cours de téléchargement...*_\n\n`
       }

      

      

      

      

      
//

    /*  let buffer = Buffer.from([]);
    for await (const elm of media) {
      buffer = Buffer.concat([buffer, elm]);
    }*/

//


// console.log("le son "+urlElement)

/* yt.mp3(urlElement).then((fichier)=>{
   const entFic=fichier.path;
   const sortFic=entFic+".opus";
   ffmpeg.format("opus") .on("error", (err) => {
              console.error( err);
            }).on('end',async()=>{

                     zk.sendMessage(origineMessage, { audio: { url:fs.readFileSync(sortFic)/*"./audio.mp3"*//*},mimetype:'audio/mp4' }, { quoted: ms,ptt: true }) ;
            }).save(sortFic)
 })*/
     // console.log("le son "+urlElement)*/
      
       zk.sendMessage(origineMessage,infoMess,{quoted:ms}) ;
      // Obtenir le flux audio de la vidéo
      const audioStream = ytdl(urlElement, { filter: 'audioonly', quality: 'highestaudio' });

      // Nom du fichier local pour sauvegarder le fichier audio
      const filename = 'audio.mp3';

      // Écrire le flux audio dans un fichier local
      const fileStream = fs.createWriteStream(filename);
      audioStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Envoi du fichier audio en utilisant l'URL du fichier local
      

     zk.sendMessage(origineMessage, { audio: { url:"audio.mp3"},mimetype:'audio/mp4' }, { quoted: ms,ptt: false });
        console.log("Envoi du fichier audio terminé !");
      });

      fileStream.on('error', (error) => {
        console.error('Erreur lors de l\'écriture du fichier audio :', error);
        repondre('Une erreur est survenue lors de l\'écriture du fichier audio.');
      });
    } else {
      repondre('Aucune vidéo trouvée.');
    }
  } catch (error) {
    console.error('Erreur lors de la recherche ou du téléchargement de la vidéo :', error);
    
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de la vidéo.');
  }
});

  

zokou({
  nomCom: "video",
  categorie: "Recherche",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Veillez entrer un terme de recherche s'il vous plaît");
    return;
  }

  const topo = arg.join(" ");
  try {
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const Element = videos[0];

      let InfoMess = {
        image: { url: videos[0].thumbnail },
        caption: `*nom de la vidéo :* _${Element.title}_
*Durée :* _${Element.timestamp}_
*Lien :* _${Element.url}_
_*En cours de téléchargement...*_\n\n`
      };

      zk.sendMessage(origineMessage, InfoMess, { quoted: ms });

      // Obtenir les informations de la vidéo à partir du lien YouTube
      const videoInfo = await ytdl.getInfo(Element.url);
      // Format vidéo avec la meilleure qualité disponible
      const format = ytdl.chooseFormat(videoInfo.formats, { quality: '18' });
      // Télécharger la vidéo
      const videoStream = ytdl.downloadFromInfo(videoInfo, { format });

      // Nom du fichier local pour sauvegarder la vidéo
      const filename = 'video.mp4';

      // Écrire le flux vidéo dans un fichier local
      const fileStream = fs.createWriteStream(filename);
      videoStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Envoi du fichier vidéo en utilisant l'URL du fichier local
        zk.sendMessage(origineMessage, { video: { url :"./video.mp4"} , caption: "*Zokou-Md", gifPlayback: false }, { quoted: ms });
      });

      fileStream.on('error', (error) => {
        console.error('Erreur lors de l\'écriture du fichier vidéo :', error);
        repondre('Une erreur est survenue lors de l\'écriture du fichier vidéo.');
      });
    } else {
      repondre('Aucune vidéo trouvée.');
    }
  } catch (error) {
    console.error('Erreur lors de la recherche ou du téléchargement de la vidéo :', error);
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de la vidéo.');
  }
});



zokou({nomCom:"son",categorie:"Recherche"},async(dest,zk,commandeOptions)=>{
  let {ms,prefixe,arg,repondre}=commandeOptions;

   try{
     
        if(!arg||arg=="")
     {
       repondre(prefixe+"son mon gbonhi");return;
     }
     const topo = arg.join(" ");
 console.log(topo)
     var rch = yts1(topo);
     var resul = rch.videso[0];
     var sonUrl =result.url;
     yt.mp3(sonUrl).then((fichier)=>{
   const entFic=fichier.path;
   const sortFic=entFic+".opus";
   ffmpeg(entFic).format("opus") .on("error", (err) => {
              console.error( err);
            }).on('end',async()=>{

                     zk.sendMessage(origineMessage, { audio: { url:fs.readFileSync(sortFic)/*"./audio.mp3"*/},mimetype:'audio/mp4' }, { quoted: ms,ptt: true }) ;
            }).save(sortFic)
 })
   //  console.log(mus.path);
  /* await  zk.sendMessage(dest,{ audio: fs.readFileSync(mus.path),
                  mimetype: "audio/mpeg",
                  ptt: true,},{quoted:ms})*/
   }catch(e){}
     
})

