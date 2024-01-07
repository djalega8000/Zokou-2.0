const { zokou } = require('../framework/zokou');
const { attribuerUnevaleur } = require('../bdd/welcome');

async function events(nomCom) {
    zokou({
        nomCom: nomCom,
        categorie: 'Groupe'
    }, async (dest, zk, commandeOptions) => {
        const { ms, arg, repondre, superUser, verifAdmin } = commandeOptions;

        if (verifAdmin || superUser) {
            if (!arg[0] || arg.join(' ') === ' ') {
                repondre(nomCom + ' ' + ' oui pour activer et ' + ' ' + nomCom + ' ' + 'non pour désactiver');
            } else {
                if (arg[0] === 'oui' || arg[0] === 'non') {
                    // Correction de l'erreur ici : arg[non] à arg[0]
                    await attribuerUnevaleur(dest, nomCom, arg[0]);
                    repondre( nomCom + " a été actualisé sur " + arg[0]);
                } else {
                    repondre('oui pour activer et non pour désactiver');
                }
            }
        } else {
            repondre('Vous ne pouvez pas utiliser cette commande');
        }
    });
}

// Appel de la fonction events pour les valeurs 'welcome' et 'goodbye'
events('welcome');
events('goodbye'); 
events('antipromote');
events('antidemote');
