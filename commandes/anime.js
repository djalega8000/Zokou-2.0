const axios = require("axios");
const {zokou} = require("../framework/zokou")

zokou({
  nomCom: "anime",
  categorie: "Fun",
  reaction: "📺"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const jsonURL = "https://api.jikan.moe/v4/random/anime"; // Remplacez par votre URL JSON

  try {
    const response = await axios.get(jsonURL);
    const data = response.data.data;

    const title = data.title;
    const synopsis = data.synopsis;
    const imageUrl = data.images.jpg.image_url; // Utilisez l'URL de l'image JPG
    const episodes = data.episodes;
    const status = data.status;

    const message = `📺 Titre: ${title}\n🎬 Épisodes: ${episodes}\n📡 Statut: ${status}\n📝 Synopsis: ${synopsis}\n🔗 URL: ${data.url}`;

    // Envoyer l'image et les informations
    zk.sendMessage(origineMessage, { image: { url: imageUrl }, text: message }, { quoted: ms });
  } catch (error) {
    console.error('Erreur lors de la récupération des données depuis le JSON :', error);
    repondre('Erreur lors de la récupération des données depuis le JSON.');
  }
});
