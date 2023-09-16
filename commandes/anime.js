const axios = require("axios");
const {zokou} = require("../framework/zokou");
const traduire = require("../framework/traduction");
const {Sticker ,StickerTypes}= require('wa-sticker-formatter');

zokou({
  nomCom: "ranime",
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

    const texttraduit = await traduire(synopsis,{ to: 'fr' })

    const message = `📺 Titre: ${title}\n🎬 Épisodes: ${episodes}\n📡 Statut: ${status}\n📝 Synopsis: ${texttraduit}\n🔗 URL: ${data.url}`;
    
    // Envoyer l'image et les informations
    zk.sendMessage(origineMessage, { image: { url: imageUrl }, caption: message }, { quoted: ms });
  } catch (error) {
    console.error('Erreur lors de la récupération des données depuis le JSON :', error);
    repondre('Erreur lors de la récupération des données depuis le JSON.');
  }
});

zokou({
  nomCom: "google",
  categorie: "Recherche"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;
  
  if (!arg[0] || arg === "") {
    repondre("Donnez-moi une requête.\n*Exemple : .google Qui est Suhail Tech.*");
    return;
  }

  const google = require('google-it');
  try {
    const results = await google({ query: arg.join(" ") });
    let msg = `Recherche Google pour : ${arg}\n\n`;

    for (let result of results) {
      msg += `➣ Titre : ${result.title}\n`;
      msg += `➣ Description : ${result.snippet}\n`;
      msg += `➣ Lien : ${result.link}\n\n────────────────────────\n\n`;
    }
    
    const trdmsg = await traduire(msg,{to : 'fr'})
    repondre(trdmsg);
  } catch (error) {
    repondre("Une erreur s'est produite lors de la recherche Google.");
  }
});

zokou({
  nomCom: "imdb",
  categorie: "Recherche"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre , ms } = commandeOptions;

  if (!arg[0] || arg === "") {
    repondre("donnez le nom d'une  série ou un film.");
    return;
  }

  try {
    
    const response = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${arg}&plot=full`);
    const imdbData = response.data;

    let imdbInfo = "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n";
    imdbInfo += " ``` 𝕀𝕄𝔻𝔹 𝕊𝔼𝔸ℝℂℍ```\n";
    imdbInfo += "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
    imdbInfo += "🎬Titre      : " + imdbData.Title + "\n";
    imdbInfo += "📅Année      : " + imdbData.Year + "\n";
    imdbInfo += "⭐Évaluation : " + imdbData.Rated + "\n";
    imdbInfo += "📆Sortie     : " + imdbData.Released + "\n";
    imdbInfo += "⏳Durée      : " + imdbData.Runtime + "\n";
    imdbInfo += "🌀Genre      : " + imdbData.Genre + "\n";
    imdbInfo += "👨🏻‍💻Réalisateur : " + imdbData.Director + "\n";
    imdbInfo += "✍Scénariste : " + imdbData.Writer + "\n";
    imdbInfo += "👨Acteurs   : " + imdbData.Actors + "\n";
    imdbInfo += "📃Synopsis  : " + imdbData.Plot + "\n";
    imdbInfo += "🌐Langue    : " + imdbData.Language + "\n";
    imdbInfo += "🌍Pays      : " + imdbData.Country + "\n";
    imdbInfo += "🎖️Récompenses : " + imdbData.Awards + "\n";
    imdbInfo += "📦BoxOffice : " + imdbData.BoxOffice + "\n";
    imdbInfo += "🏙️Production : " + imdbData.Production + "\n";
    imdbInfo += "🌟score : " + imdbData.imdbRating + "\n";
    imdbInfo += "❎imdbVotes : " + imdbData.imdbVotes + "";

    zk.sendMessage(dest, {
      image: {
        url: imdbData.Poster,
      },
      caption: await traduire(imdbInfo , {to : 'fr'}),
    }, {
      quoted: ms,
    });
  } catch (error) {
    repondre("Une erreur s'est produite lors de la recherche IMDb.");
  }
});


zokou({
  nomCom: "emomix",
  categorie: "Conversion"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre,ms , nomAuteurMessage } = commandeOptions;

  if (!arg[0] || arg.length !== 1) {
    repondre("Utilisation incorrecte. Exemple : .emojimix 😀;🥰");
    return;
  }

  // Divisez la chaîne en deux emojis en utilisant le point-virgule comme séparateur
  const emojis = arg.join(' ').split(';');

  if (emojis.length !== 2) {
    repondre("Veuillez spécifier deux emojis en utilisant un point-virgule comme séparateur.");
    return;
  }

  const emoji1 = emojis[0].trim();
  const emoji2 = emojis[1].trim();

  try {
    const axios = require('axios');
    const response = await axios.get(`https://levanter.onrender.com/emix?q=${emoji1}${emoji2}`);

    if (response.data.status === true) {
      // Si la requête a réussi, envoyez l'image résultante
      
      let stickerMess = new Sticker(response.data.result, {
        pack: nomAuteurMessage,
        type: StickerTypes.CROPPED,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 70,
        background: "transparent",
      });
      const stickerBuffer2 = await stickerMess.toBuffer();
      zk.sendMessage(dest, { sticker: stickerBuffer2 }, { quoted: ms });

    } else {
      repondre("Impossible de créer l'emoji mix.");
    }
  } catch (error) {
    repondre("Une erreur s'est produite lors de la création de l'emoji mix." + error );
  }
});

