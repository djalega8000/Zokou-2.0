const { zokou } = require('../framework/zokou');
const { addOrUpdateDataInNeo, getDataFromNeo } = require('../bdd/neo');
const { ajouterOuMettreAJourUserData, getRByJID } = require('../bdd/fiche');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou(
  {
    nomCom: 'north1',
    categorie: 'NEOverse'
  },
  async (dest, zk, commandeOptions) => {

    const { ms, arg, repondre, superUser } = commandeOptions;

      // si le message contient le mot "salut"
    if (arg && arg[0].toLowerCase() === 'anv code:Lily' {
      // Ajouter +10000 au nombre déjà présent pour 𝐆𝐨𝐥𝐝𝐬🧭
      const userData = await getRByJID(ms.from);
      const nouvelleValeur = userData.R1 + 10000;
      await ajouterOuMettreAJourUserData(ms.from, { R1: nouvelleValeur });
      repondre(`Récompense ajoutée avec succès: +10000 pour 𝐆𝐨𝐥𝐝𝐬🧭. Nouvelle valeur : ${nouvelleValeur}`);
      return;
    }

    const data = await getDataFromNeo();

    if (!arg || !arg[0] || arg.join('') === '') {

      if (data) {

        const { message, lien } = data;

        var mode = "public";
        if (s.MODE != "oui") {
          mode = "privé";
        }

        moment.tz.setDefault('Etc/GMT');

        // Créer une date et une heure en GMT
        const temps = moment().format('HH:mm:ss');
        const date = moment().format('DD/MM/YYYY');

        const neomsg = `
        *NEOverse Rp Gaming*
        *Date* : ${date}
        *Heure* : ${temps}
        ${message}`;

        if (lien.match(/\.(mp4|gif)$/i)) {
          try {
            zk.sendMessage(dest, { video: { url: lien }, caption: neomsg }, { quoted: ms });
          }
          catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
          }
        }
        // Vérification pour .jpeg ou .png
        else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
          try {
            zk.sendMessage(dest, { image: { url: lien }, caption: neomsg }, { quoted: ms });
          }
          catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
          }
        }
        else {
          repondre(neomsg);
        }

      } else {
        if (!superUser) { repondre("il n'y a pas de fiche north1 enregistrée "); return };

        await repondre("Vous n'avez pas encore enregistré la fiche north1, pour ce faire ;\n tapez entrez après north1 votre message et votre lien image ou vidéo dans ce contexte : /north1 message;lien");
        repondre(" veuillez me contacter pour plus amples explications");
      }
    } else {

      if (!superUser) { repondre("Seuls les membres de la NS ont le droit de modifier la Fiche North1"); return };

      const texte = arg.join(' ').split(';')[0];
      const tlien = arg.join(' ').split(';')[1];

      await addOrUpdateDataInNeo(texte, tlien);
      repondre('Fiche North1 actualisée avec succès');
    }
  });
