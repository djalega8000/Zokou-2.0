const { zokou } = require('../framework/zokou');

// Définir une liste de devinettes avec les questions et les réponses
const devinettes = [
  {
    question: "Je peux voler sans ailes, qui suis-je ?",
    reponse: "Le temps",
  },
  {
    question: "Je suis toujours affamé, le plus je mange, le plus gros je deviens. Qui suis-je ?",
    reponse: "Un trou noir",
  },
  {
    question: "Je suis fort quand je suis en bas, mais je suis faible quand je suis en haut. Qui suis-je ?",
    reponse: "Le chiffre 6",
  },
  {
    question: "Je peux être court ou long, dur ou mou, je peux être utilisé par n'importe qui, de jeunes enfants à des musiciens expérimentés. Qui suis-je ?",
    reponse: "Un crayon",
  },
  {
    question: "Je suis le début de la fin, la fin de chaque lieu. Je suis le début de l'éternité, la fin du temps et de l'espace. Qui suis-je ?",
    reponse: "La lettre 'E'",
  },
  {
    question: "Je suis blanc quand je suis sale et noir quand je suis propre. Qui suis-je ?",
    reponse: "Une ardoise",
  },
  {
    question: "Je suis liquide, mais si vous m'enlevez de l'eau, je deviens solide. Qui suis-je ?",
    reponse: "Le thé",
  },
  {
    question: "Je vole sans ailes, je pleure sans yeux. Où que je me trouve, la mort m'accompagne toujours. Qui suis-je ?",
    reponse: "Le vent",
  },
  {
    question: "J'ai des villes, mais pas de maisons. J'ai des montagnes, mais pas d'arbres. J'ai de l'eau, mais pas de poissons. Qui suis-je ?",
    reponse: "Une carte",
  },
  {
    question: "Je peux être lu, mais vous ne pouvez pas écrire sur moi. Vous me donnez toujours, mais me gardez rarement. Qui suis-je ?",
    reponse: "Un livre emprunté",
  },
  {
    question: "Je viens deux fois dans une semaine, une fois dans un an, mais jamais dans un jour. Qui suis-je ?",
    reponse: "La lettre 'E'",
  },
  {
    question: "Je suis difficile à saisir, mais vous me tiendrez dans votre main lorsque vous me trouverez. Qui suis-je ?",
    reponse: "Votre souffle",
  },
  {
    question: "Plus je suis chaud, plus je deviens froid. Qui suis-je ?",
    reponse: "Le café",
  },
  {
    question: "Je suis l'étoffe des rêves. Je couvre les idées brisées. Je change les âmes en ailes. Qui suis-je ?",
    reponse: "Un livre",
  },
  {
    question: "Je suis blanc quand je suis sale et noir quand je suis propre. Qui suis-je ?",
    reponse: "Une ardoise",
  },
  {
    question: "Je peux voler sans avoir d'ailes. Je peux pleurer sans avoir des yeux. Qui suis-je ?",
    reponse: "Un nuage",
  },
  {
    question: "Je commence la nuit et finis le matin. Qui suis-je ?",
    reponse: "La lettre 'N'",
  },
  {
    question: "Je peux être lu, mais vous ne pouvez pas écrire sur moi. Vous me donnez toujours, mais me gardez rarement. Qui suis-je ?",
    reponse: "Un livre emprunté",
  },
  {
    question: "Je me nourris de tout ce qui m'entoure, l'air, la terre et même les arbres. Qui suis-je ?",
    reponse: "Un feu",
  },
  {
    question: "Je suis blanc quand je suis sale et noir quand je suis propre. Qui suis-je ?",
    reponse: "Une ardoise",
  },
  {
    question: "Je suis liquide, mais si vous m'enlevez de l'eau, je deviens solide. Qui suis-je ?",
    reponse: "Le thé",
  },
  {
    question: "Je suis le commencement de la fin et la fin de chaque place. Je suis le début de l'éternité, la fin du temps et de l'espace. Qui suis-je ?",
    reponse: "La lettre 'E'",
  },
  {
    question: "Je suis difficile à saisir, mais vous me tiendrez dans votre main lorsque vous me trouverez. Qui suis-je ?",
    reponse: "Votre souffle",
  },
  ];
  
zokou({ nomCom: "devinette", categorie: "Games" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre } = commandeOptions;

  // Choisir une devinette aléatoire
  const devinette = devinettes[Math.floor(Math.random() * devinettes.length)];

  // Envoyer la question de la devinette
  await zk.sendMessage(
    dest,
    {
      text: `Devinette : ${devinette.question} . \n vous avez 30 secondes de réflexion.`,
    },
    { quoted: ms }
  );

  // Attendre 60 secondes avant d'envoyer la réponse
  await delay(30000);

  // Envoyer la réponse
  await zk.sendMessage(
    dest,
    {
      text: `La réponse était : ${devinette.reponse}`,
    },
    { quoted: ms }
  );
});

// Fonction pour créer une pause/délai en millisecondes
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
