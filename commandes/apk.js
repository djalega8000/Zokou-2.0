const { zokou } = require("../framework/zokou");
const { search, download } = require('aptoide-scraper');
const axios = require('axios');
const fs = require('fs');

zokou({ nomCom: "app", reaction: "✨", categorie: "Recherche" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, origineMessage, ms } = commandeOptions;

  if (!arg || arg.length === 0) {
    return repondre("Veuillez entrer le nom de l'application à rechercher.");
  }
  
  const getRandomName = (ext) => `${Math.floor(Math.random() * 10000)}${ext}`;
  const randomName = getRandomName(".app");
  const filePath = `./${randomName}`;
  const nom = arg.join(' ');

  try {
    const recherche = search(nom);

    if (recherche.length === 0) {
      return repondre(`L'application recherchée est introuvable.`);
    }

    const data = await download(recherche[0].id);
    const appSize = parseInt(data.size);

    if (appSize > 200) {
      return repondre("Impossible de télécharger une application de plus de 200 Mo.");
    }

    const url = data.dllink;

    const writer = fs.createWriteStream(filePath);
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    const rep1 = response.data.pipe(writer);
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    const rep2 = {
      document: fs.readFileSync(filePath),
      mimetype: 'application/vnd.android.package-archive',
      fileName: `${data.name}.app`,
      caption: `*Nom de l'application :* ${data.name}\n` +
               `*Identifiant de l'application :* ${data.package}\n` +
               `*Dernière mise à jour :* ${data.lastup}\n` +
               `*Taille de l'application :* ${data.size}\n\n`,
    };

    await zk.sendMessage(origineMessage, rep2, { quoted: ms });

    console.log('Application téléchargée avec succès.');

    await fs.unlink(filePath);

    console.log('Application supprimée avec succès.');
  } catch (e) {
    console.error('Erreur générale :', e);
    repondre("Oups, une erreur est survenue lors du téléchargement de l'application.");
  }
});
