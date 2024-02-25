var tabCmds = [];
let cm = [];
function zokou(obj, fonctions) {
    let infoComs = obj;
    if (!obj.categorie) {
        infoComs.categorie = "Général";
    }
    if (!obj.reaction) {
        infoComs.reaction = "💫";
    }
    infoComs.fonction = fonctions;
    cm.push(infoComs);
    // console.log('chargement...')
    return infoComs;
}
module.exports = { zokou, Module: zokou, cm };
