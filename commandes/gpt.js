const { zokou } = require("../framework/zokou");
const axios = require('axios');

zokou({ nomCom: "gpt", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Veuillez poser votre question.");
    }

    const question = arg.join(' ');
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };

    const data = {
      prompt: question,  // Utilisez la question comme prompt
      max_tokens: 200,
    };

    const response = await axios.post(apiUrl, data, { headers }); // Attendez la réponse

    const rep = response.data.choices[0].text;
    repondre(`GPT réponse:\n${rep}`);
  } catch (error) {
    console.error('Erreur générale :', error);
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});
