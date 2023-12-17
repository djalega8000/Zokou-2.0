const { zokou } = require("../framework/zokou");
const conf = require('../set');
const fetch = require('node-fetch');

zokou({ nomCom: "gpt", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Veuillez poser une question.");
    }

    const question = arg.join('');

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${conf.OPENAI_API_KEY}`, 
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", 
        messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: question }],
      }),
    });

    const responseData = await response.json();
    console.log("GPT REPONCE : ",data); 
    
    // Vérifier si choices existe et a au moins un élément
    if (responseData.choices || responseData.choices.length === 0) {
      repondre("OPENAI_API_KEY  invalide, veuillez mettre une nouvelle clé");
    } else {
      repondre(responseData.choices[0].message.content);
        }
    
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});



const data = await response.json();
  console.log("GPT REPONCE : ",data); 
  if (!data.choices || data.choices.length === 0) {citel.reply("*Invalid ChatGPT API Key, Please Put New Key*"); }
  return await  citel.reply(data.choices[0].message.content)
