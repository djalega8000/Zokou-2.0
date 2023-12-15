const { zokou } = require("../framework/zokou");
const axios = require('axios');

async function getChatGPTResponse(question) {
  const OPENAI_API_KEY = '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';

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
      {
        prompt: question,
        max_tokens: 200,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    
    const data = response.data;
    return data.choices[0].text.trim();
  } catch (error) {
    console.error('Erreur lors de la requête à l\'API OpenAI:', error.message);
    throw error;
  }
}

zokou({ nomCom: "gpt", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (!arg || arg.length === 0) {
    return repondre("Veuillez poser votre question.");
  }

  const question = arg.join(' ');

  try {
    const reponse = await getChatGPTResponse(question);
    
    if (reponse) {
      zk.sendMessage(reponse);
    } else {
      console.error('Erreur lors de la requête à l\'API OpenAI:');
      return repondre('Une erreur s\'est produite lors du traitement de votre demande.');
    }
  } catch (e) {
    console.error('Erreur générale :', e);
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});
