const axios = require('axios')
  const fetch = require('node-fetch');

async function getChatGPTResponse(question) {
  try {
    const OPENAI_API_KEY = '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';
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", 
        messages: [{ role: "system", content: "You" }, { role: "user", content: question }],
      }),
    });

    const data = await response.json();

    // Log de la réponse de GPT dans la console
    console.log("GPT REPONSE : ", data);

    // Vérification de la validité de la clé OpenAI API
    if (!data.choices || data.choices.length === 0) {
      return "*INVALIDE OPENAI_API_KEY, veuillez insérer une clé valide*";
    }

    // Envoyer la première réponse
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Erreur d\'appel OpenAI API:', error.message);
    return 'Une erreur s\'est produite lors du traitement de votre demande.';
  }
}

zokou({ nomCom: "gpt", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (!arg || !arg[0]) {
    return repondre("Veuillez poser votre question.");
  }

  var question = arg.join(' ');

  try {
    const reponse = await getChatGPTResponse(question);
    repondre(reponse);
  } catch (e) {
    repondre("Oups, une erreur : " + e);
  }
});
