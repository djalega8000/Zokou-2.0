const { zokou } = require("../framework/zokou");
const { search, download } = require('aptoide-scraper');
const axios = require('axios');
const fs = require('fs-extra');

zokou({ nomCom: "app", reaction: "✨", categorie: "Recherche" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, origineMessage, ms } = commandeOptions;

  if (!arg || arg.length === 0) {
    return repondre("Veuillez entrer le nom de l'application à rechercher.");
  }

  const getRandom = (ext) => `${Math.floor(Math.random() * 10000)}${ext}`;
  let randomName = getRandom(".apk");
  const filePath = `./${randomName}`;
  const nom = arg.join(' ');

  try {
    const recherche = search(nom);

    if (!recherche || recherche.length === 0 || !recherche[0].id) {
      return repondre(`L'application recherchée est introuvable ou ne possède pas d'ID.`);
    }

    const data = await download(recherche[0].id);
    const appSize = parseInt(data.size);

    if (appSize > 300) {
      return repondre("Impossible de télécharger une application de plus de 300 Mo.");
    }

    const url = data.dllink;

    axios.get(url, { responseType: 'stream' })
      .then(response => {
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
      })
      .then(() => {
        const rep2 = {
          document: fs.readFileSync(filePath),
          mimetype: 'application/vnd.android.package-archive',
          fileName: `${data.name}.apk`,
          caption: `*Nom de l'application :* ${data.name}\n` +
                   `*Identifiant de l'application :* ${data.package}\n` +
                   `*Dernière mise à jour :* ${data.lastup}\n` +
                   `*Taille de l'application :* ${data.size}\n\n`,
        };

        zk.sendMessage(origineMessage, rep2, { quoted: ms });

        console.log('Application téléchargée avec succès.');

        fs.unlinkSync(filePath);

        console.log('Application supprimée avec succès.');
      })
      .catch((error) => {
        console.error('Erreur lors du téléchargement ou de l\'envoi de l\'application :', error);
        repondre("Oups, une erreur est survenue lors du téléchargement ou de l'envoi de l'application.");
      });
  } catch (e) {
    console.error('Erreur générale :', e);
    repondre("Oups, une erreur est survenue lors du téléchargement de l'application.");
  }
});


