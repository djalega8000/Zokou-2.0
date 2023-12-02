const { zokou } = require('../framework/zokou');
const {addOrUpdateDataInWest3 , getDataFromWest3} = require('../bdd/west3')
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou(
    {
        nomCom : 'west3',
        categorie : 'NEOverse'
        
    },async (dest,zk,commandeOptions) => {

 const {ms , arg, repondre,superUser} = commandeOptions;

 const data = await getDataFromWest3();

 if (!arg || !arg[0] || arg.join('') === '') {

    if(data) {
       
        const {message , lien} = data;


        var mode = "public";
        if (s.MODE != "oui") {
            mode = "privé";
        }
      
    
     
    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

    const west3msg = `
      *NEOverse Rp Gaming*
*Date* : ${date}
*Heure* : ${temps}

 ${message}`

 if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption: west3msg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption: west3msg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(west3msg);
    
}

    } else {
        if(!superUser) { repondre("il n'y a pas de fiche west3 enregistrée ") ; return};
      await   repondre("Vous n'avez pas encore enregistrer la fiche west3 , pour ce faire ;\n tapez entrez apres west3 votre message et votre lien image ou video dans ce contete : /west3 message;lien");
         repondre(" veuillier me contacter pour plus ample explications")
     }
 } else {

    if(!superUser) { repondre ("Seul les membre de la NS ont le droit de modifier la Fiche west3") ; return};

  
    const texte = arg.join(' ').split(';')[0];
    const tlien = arg.join(' ').split(';')[1]; 


    
await addOrUpdateDataInWest3(texte , tlien)

repondre('Fiche west3 actualiser avec succes')

}
    });
