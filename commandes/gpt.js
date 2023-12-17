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
    
    // Vérifier si choices existe et a au moins un élément
    if (responseData.choices && responseData.choices.length > 0) {
      const rep = responseData.choices[0].message.content;
      repondre(rep);
    } else {
      const rep2 = responseData;
      repondre(rep2);
        }
    
  } catch (error) {
    console.error('Erreur:', error.message || 'Une erreur s\'est produite');
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});
