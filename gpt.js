const fetch = require('node-fetch');

zokou({ nomCom: "gpt", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  // Vérification de la présence d'une question
  if (!arg || arg.length === 0) {
    return repondre("Veuillez poser votre question.");
  }

  // Concaténation des mots de la question en une seule chaîne
  const question = arg.join(' ');

  try {
    // Appel de la fonction getChatGPTResponse avec la question
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur lors de la requête à l\'API OpenAI:', errorText);
      return 'Une erreur s\'est produite lors du traitement de votre demande.';
    }

    const data = await response.json();

    // Log de la réponse de GPT dans la console
    console.log("GPT REPONSE : ", data);

    // Vérification de la validité de la réponse
    if (!data.choices || data.choices.length === 0) {
      return "*INVALIDE OPENAI_API_KEY, veuillez insérer une clé valide*";
    }

    // Envoyer la première réponse
    repondre(data.choices[0].message.content.trim());
  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur d\'appel OpenAI API:', error.message);
    return 'Une erreur s\'est produite lors du traitement de votre demande.';
  }
});

