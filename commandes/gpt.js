const { zokou } = require("../framework/zokou");
const OpenAI = require('openai');
require('dotenv').config(); // Charge les variables d'environnement depuis le fichier .env

zokou({ nomCom: "gpt", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Veuillez poser une question.");
    }

    const question = arg.join('');

    const openai = new OpenAI({
      key: process.env.OPENAI_API_KEY,
    });

    const userMessage = {
      role: 'user',
      content: question,
    };

    const requestData = {
      model: 'gpt-3.5-turbo',
      messages: [userMessage],
      temperature: 0.7,
    };

    const response = await openai.completeChat(requestData);

    // La réponse de l'API est dans response.data.choices[0].message.content
    const rep = response.data.choices[0].message.content;
    
    repondre(rep);
  } catch (error) {
    console.error('Erreur:', error.response ? error.response.data : error.message);
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});

