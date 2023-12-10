const { zokou } = require('../framework/zokou');
const deepai=require("deepai")
const traduire = require("../framework/traduction")
const axios = require("axios")


async function ia(requete){


  
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
  

});


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

  if (!arg || !arg[0]) {
    return repondre("Veuillez poser votre question.");
  }

  var question = arg.join(' ');

  try {
    let reponse = await getChatGPTResponse(question);
    repondre(reponse);
  } catch (e) {
    repondre("Oups, une erreur : " + e);
  }
});

async function getChatGPTResponse(question) {
  try {
    const OPENAI_API_KEY = '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';
    const response = await axios.post(
      'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
      {
        prompt: question,
        max_tokens: 150,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Erreur d\'appel OpenAI API:', error.message);
    return 'Une erreur s\'est produite lors du traitement de votre demande.';
  }
}
