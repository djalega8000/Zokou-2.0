const { zokou } = require("../framework/zokou");
const axios = require('axios');



zokou({ nomCom: "gpt", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (!arg || arg.length === 0) {
    return repondre("Veuillez entrer le nom de l'application à rechercher.");
  }

  const nom = arg.join(' ');

  try {
    const recherche = search(nom);
    let data = {};
    if(recherche.length) { 
    let data = await download(recherche[0].id); 
      
  } else { return repondre(`l'application rechercher est introuvable`)};

    const appinfo = parseInt(data.size);
	if(appinfo > 200) return repondre("impossible de telecharger une application de plus de 200Mb );
       const url = data.dllink;
	 let info ="*Nom de l'application:* " +data.name;
         info +="\n*Identifiant de l'application:* " +data.package;
         info +="\n*Derniere mise a jour:* " +data.lastup;
         info +="\n*Taille de l'application:* " +data.size;
        // info +="\n*Lien de l'application:* " +data.dllink;
	info +="\n\n "
	
  } catch (e) {
    console.error('Erreur générale :', e);
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});



attern: "apk",
            desc: "Downloads apks  .",
            category: "downloader",
            filename: __filename,
            use: '<add sticker url.>',
        },

        async(Void, citel, text) => {
        if(!text )return citel.reply("*Give me App Name*");

	const getRandom = (ext) => { return `${Math.floor(Math.random() * 10000)}${ext}`; };
	let randomName = getRandom(".apk");
	const filePath = `./${randomName}`;     // fs.createWriteStream(`./${randomName}`)
        const {  search , download } = require('aptoide-scraper')
	let searc = await search(text);          //console.log(searc);
	let data={};
	if(searc.length){ data = await download(searc[0].id); }
	else return citel.send("*APP not Found, Try Other Name*");
	
	
	const apkSize = parseInt(data.size);
	if(apkSize > 150) return citel.send(`❌ File size bigger than 200mb.`);
       const url = data.dllink;
	 let  inf  ="*App Name :* " +data.name;
         inf +="\n*App id        :* " +data.package;
         inf +="\n*Last Up       :* " +data.lastup;
         inf +="\n*App Size     :* " +data.size;
        // inf +="\n*App Link     :* " +data.dllink;
	inf +="\n\n "
         

axios.get(url, { responseType: 'stream' })
  .then(response => {
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }).then(() => {
	
	let buttonMessage = {
                        document: fs.readFileSync(filePath),
                        mimetype: 'application/vnd.android.package-archive',
                        fileName: data.name+`.apk`,
                        caption : inf
                        
                    }
                  Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })

    console.log('File downloaded successfully');

  
    fs.unlink(filePath, (err) => {
      if (err) { console.error('Error deleting file:', err); } else { console.log('File deleted successfully'); } });
  }) .catch(error => {
	fs.unlink(filePath)
    return citel.reply('*Apk not Found, Sorry*')//:', error.message);
  });
}
