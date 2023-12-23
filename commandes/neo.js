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

    if (arg && arg.length > 0) {
      // Vérifiez si le message est de type "Jouer👥 : actualisé gold +10000"
      const regex = /^Jouer👥 : (.+): actualisé gold ([+-]?\d+)🧭$/i;
      const match = arg.join(' ').match(regex);

      if (match) {
        const nomJoueur = match[1]; // Obtenez le nom du joueur
        const modificationGold = parseInt(match[2]); // Obtenez la modification de l'or

        // Obtenez les données actuelles du joueur
        const joueurData = await getDataFromNeo(nomJoueur);

        // Ajoutez ou soustrayez l'or en fonction de la modification
        const nouvellesGold = joueurData.gold + modificationGold;

        // Mettez à jour les données du joueur dans la base de données
        await addOrUpdateDataInNeo(nomJoueur, { gold: nouvellesGold });

        // Répondez pour informer que les informations ont été mises à jour
        repondre(`Les informations du joueur ${nomJoueur} ont été mises à jour. Nouveau total de Gold : ${nouvellesGold}🧭`);
        return;
      }
    }

    // Si ce n'est pas une mise à jour spécifique, continuez avec le reste du code
    const data = await getDataFromNeo();

    if (!arg || !arg[0] || arg.join('') === '') {
      if (data) {
        const { message, lien } = data;
        // ... (restez avec la logique actuelle pour afficher la fiche)
      } else {
        if (!superUser) { repondre("il n'y a pas de fiche north1 enregistrée "); return };
        // ... (restez avec la logique actuelle pour informer qu'il n'y a pas de fiche)
      }
    } else {
      if (!superUser) { repondre("Seuls les membres de la NS ont le droit de modifier la Fiche North1"); return };
      // ... (restez avec la logique actuelle pour mettre à jour la fiche)
    }
  });
