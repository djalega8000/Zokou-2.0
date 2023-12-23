const { zokou } = require('../framework/zokou');
const { addOrUpdateDataInNeo, getDataFromNeo } = require('../bdd/neo');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou(
  {
    nomCom: 'north1',
    categorie: 'NEOverse'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre, superUser } = commandeOptions;

    try {
      if (arg && arg.length > 0) {
        // Vérifiez si le message est de type "Jouer👥 : Lily KÏNGS II: actualisé gold +10000🧭"
        const match = `/^Jouer👥 : (.+): actualisé gold ([+-]?\d+)🧭$/i`;

        if (match) {
          const playerName = match[1].toLowerCase().replace(/\s+/g, ''); // Normalisez le nom du joueur
          const modificationGold = parseInt(match[2]); // Obtenez la modification de l'or

          // Obtenez les données actuelles du joueur
          const playerData = await getDataFromNeo(`joueur_${playerName}`);

          // Ajoutez ou soustrayez l'or en fonction de la modification
          const nouvellesGold = playerData.gold + modificationGold;

          // Mettez à jour les données du joueur dans la base de données
          await addOrUpdateDataInNeo(`joueur_${playerName}`, { gold: nouvellesGold });

          // Répondez pour informer que les informations ont été mises à jour
          repondre(`Les informations du joueur ${playerName} ont été mises à jour. Nouveau total de Gold : ${nouvellesGold}`);
          return;
        }
      }

      // Si ce n'est pas une mise à jour spécifique, continuez avec le reste du code
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
            } catch (e) {
              console.error("Erreur lors de l'envoi du message vidéo/gif :", e);
              repondre("Une erreur s'est produite lors de l'envoi du message vidéo/gif.");
            }
          }
          // Vérification pour .jpeg ou .png
          else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            try {
              zk.sendMessage(dest, { image: { url: lien }, caption: neomsg }, { quoted: ms });
            } catch (e) {
              console.error("Erreur lors de l'envoi du message image :", e);
              repondre("Une erreur s'est produite lors de l'envoi du message image.");
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
    } catch (error) {
      console.error("Erreur générale :", error);
      repondre("Une erreur s'est produite lors du traitement de la commande.");
    }
  });

