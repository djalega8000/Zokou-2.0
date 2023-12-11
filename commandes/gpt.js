const zk = require('farmwork/zokou');
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
        messages: [{ role: "user", content: question }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur lors de la requête à l\'API OpenAI:', errorText);
      return 'Une erreur s\'est produite lors du traitement de votre demande.';
    }

    const data = await response.json();
    console.log("GPT REPONSE : ", data);

    if (!data.choices || data.choices.length === 0) {
      return "*INVALIDE OPENAI_API_KEY, veuillez insérer une clé valide*";
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Erreur d\'appel OpenAI API:', error.message);
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
    repondre(reponse);
  } catch (e) {
    console.error('Erreur générale :', e);
    repondre("Oups, une erreur est survenue lors du traitement de votre demande.");
  }
});
￼Enter
