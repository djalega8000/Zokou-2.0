const {zokou} = require ('../framework/zokou')


zokou({ nomCom: "citation", categorie: "Fun" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe ,arg } = commandeOptions;
  if (!verifGroupe) {
    repondre("commande réservée au groupe uniquement");
    return;
  }
   if (!arg[0]) {
     
  
  try {
    fetch("https://animechan.xyz/api/random")
      .then((response) => response.json())
      .then((quote) => repondre(`╔══════════════════════════╗
║   Zokou-md               ║
╚══════════════════════════╝

🎬 Anime: ${quote.anime}
👤 Character: ${quote.character}
💬 Quote: ${quote.quote}

propulser par Zokou-MD`));
  } catch (e) {
  
    repondre("erreur lors de la génération de la citation " + e);  }
  } else {
   const query = arg.join(" ")

     try {
    fetch("https://animechan.xyz/api/random/character?name="+ query)
      .then((response) => response.json())
      .then((quote) => repondre(`╔══════════════════════════╗
║   Zokou-md               ║
╚══════════════════════════╝

🎬 Anime: ${quote.anime}
👤 Character: ${quote.character}
💬 Quote: ${quote.quote}

propulser par Zokou-MD`));
  } catch (e) {
  
    repondre("erreur lors de la génération de la citation " + e);  }
  }
});
