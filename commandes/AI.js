const { zokou } = require('../framework/zokou');
//const deepai=require("deepai")
const traduire = require("../framework/traduction") ;
//const fetch = require('node-fetch');
const conf = require('../set');


/*async function ia(requete){


  
 deepai.setApiKey("quickstart-QUdJIGlzIGNvbWluZy4uLi4K");

  
var rep =await deepai.callStandardApi("text-generator",{text:requete});
  return rep.output;
};

zokou({nomCom:"zokou",reaction:"📡",categorie:"IA"},async(dest,zk,commandeOptions)=>{

const {repondre,ms,arg}=commandeOptions;

  if(!arg || !arg[0])
  {return repondre("Veuillez poser votre question .")}
  var quest = arg.join(' ');
try{
  let rep= await ia(quest);
 let tex = await traduire(rep , { to: 'fr' })

  repondre(tex);
}catch(e){ repondre("oupsaa une erreur : "+e)}
  

}); */


zokou({nomCom:"bot",reaction:"📡",categorie:"IA"},async(dest,zk,commandeOptions)=>{

  const {repondre,ms,arg}=commandeOptions;
  
    if(!arg || !arg[0])
    {return repondre("oui je vous ecoute.")}
    var quest = arg.join(' ');
  try{
    
    
const message = await traduire(arg.join(' '),{ to : 'en'});
 console.log(message)
fetch(`http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=${message}`)
.then(response => response.json())
.then(data => {
  const botResponse = data.cnt;
  console.log(botResponse);

  traduire(botResponse, { to: 'fr' })
    .then(translatedResponse => {
      repondre(translatedResponse);
    })
    .catch(error => {
      console.error('Erreur lors de la traduction en français :', error);
      repondre('Erreur lors de la traduction en français');
    });
})
.catch(error => {
  console.error('Erreur lors de la requête à BrainShop :', error);
  repondre('Erreur lors de la requête à BrainShop');
});

  }catch(e){ repondre("oupsaa une erreur : "+e)}
    
  
  });  
  

  zokou({ nomCom: "gpt", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg } = commandeOptions;
  
    try {
      if (!arg || arg.length === 0) {
        return repondre("Veuillez poser une question.");
      }
  
      const question = arg.join(' ');
  
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${conf.GPT}`, 
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", 
          messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: question }],
        }),
      });
  
      const reponseData = await response.json();
      console.log("GPT REPONCE : ",reponseData); 
      
      if (!reponseData.choices || reponseData.choices.length === 0) {
        repondre("OPENAI_API_KEY  invalide, veuillez mettre une nouvelle clé");
      } else {
        repondre(reponseData.choices[0].message.content);
          }
      
    } catch (error) {
      console.error('Erreur:', error.message || 'Une erreur s\'est produite');
      repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
    }
  });