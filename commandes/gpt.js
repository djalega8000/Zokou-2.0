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

    if (!response.ok) {
      console.error('Erreur lors de la requête à l\'API OpenAI:');
      return 'Une erreur s\'est produite lors du traitement de votre demande.';
    }

    const data = await response.json();
    return data.choices[0].text.trim();
  } catch (error) {
    console.error('Erreur lors de la requête à l\'API OpenAI:', error.message);
    return 'Une erreur s\'est produite lors du traitement de votre demande.';
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
    zk.sendMessage(reponse);
  } catch (e) {
    console.error('Erreur générale :', e);
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});
