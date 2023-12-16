const { zokou } = require("../framework/zokou");
const axios = require('axios');

zokou({ nomCom: "gpt", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Veuillez poser votre question.");
    }

    const question = arg.join(' ');
    const op = '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';

    const response = await axios.post(
      'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
      {
        prompt: question,
        max_tokens: 200,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${op}`,
        },
      }
    );

    const rep = response.data.choices[0].text.trim();
    repondre(`Réponse de ChatGPT :\n ${rep}`);
  } catch (error) {
    console.error('Erreur générale :', error);
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});

