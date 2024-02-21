const { zokou } = require('../framework/zokou');

zokou(
  { 
    nomCom: "prank", 
    categorie: "Fun" 
  }, 
  async (dest, zk, commandeOptions) => {
    const { ms, repondre } = commandeOptions;

    try {
      repondre("```Injection de virus en cours...```");
      await sleep(1000);

      for (let i = 0; i <= 10; i++) {
        repondre(`\`\`\`Injection de virus\n${'█'.repeat(i)} ${(i * 10)}%\`\`\``);
        await sleep(1000);
      }

      repondre("```Piratage du système en cours... \nConnexion au serveur - Erreur 404```");
      await sleep(1000);

      repondre("```Appareil connecté avec succès... \nRéception des données...```");
      await sleep(1000);

      repondre("```Piratage des données de l'appareil terminé à 100% \nSuppression de toutes les preuves et de tous les virus...```");
      await sleep(1000);

      repondre("```PIRATAGE TERMINÉ```");
      await sleep(1000);

      repondre("```ENVOI DES DOCUMENTS DE JOURNAL...```");
      await sleep(1000);

      repondre("```DONNÉES ENVOYÉES AVEC SUCCÈS ET Connexion déconnectée```");
      await sleep(1000);

      return repondre('*BACKLOGS CLEARED*');
    } catch (error) {
      console.error('Une erreur est survenue :', error.message);
      repondre('🙁 Une erreur est survenue');
    }
 }
);function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
} 