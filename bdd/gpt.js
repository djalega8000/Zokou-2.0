const axios = require("axios")
  
async function getChatGPTResponse(question) {
  try {
    const OPENAI_API_KEY = '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';
    const reponse = await axios.post(
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

    const data = reponse.data;

    // Log de la réponse de GPT dans la console
    console.log("GPT REPONSE : ", data);

    // Vérification de la validité de la clé OpenAI API
    if (!data.choices || data.choices.length === 0) {
      repondre("*INVALIDE OPENAI_API_KEY, veuillez insérer une clé valide*");
      return;
    }

    // Envoyer la première réponse à la fonction zk.sendMessage
    return data.choices[0].text.trim();
  } catch (error) {
    console.error('Erreur d\'appel OpenAI API:', error.message);
    return 'Une erreur s\'est produite lors du traitement de votre demande.';
  }
}
