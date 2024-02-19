const {zokou} =require("../framework/zokou");
const axios =require("axios");


zokou({ nomCom: "lyrics",
        reaction: "✨",
        categorie: "Recherche" }, async (dest, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions;  
        
   try {

    if (!arg || arg.length === 0) return repondre("Veuillez entrer un nom de musique");

    let  result  = await axios.get(`https://vihangayt.me/search/lyrics?q=${arg.join(' ')}`);

    let lyrics = result.data.data;

    if (lyrics.error) return repondre("Aucun résultat trouvé");

    let msg = `---------ZK-lyrics-finder--------

* *Artiste :* ${lyrics.artist}


* *Titre :* ${lyrics.title}


${lyrics.lyrics}`

    zk.sendMessage(dest,{image : { url : './media/lyrics-img.jpg'} , caption : msg}, { quoted : ms });
    
   } catch (err) {
       repondre('Erreur lors de la recherche de lyrics')
   }
        })