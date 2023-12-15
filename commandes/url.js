const { zokou } = require("../framework/zokou");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

async function uploadToTelegraph(Path) {
    if (!fs.existsSync(Path)) {
        throw new Error("Fichier non existant");
    }

    try {
        const form = new FormData();
        form.append("file", fs.createReadStream(Path));

        const { data } = await axios.post("https://telegra.ph/upload", form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        if (data && data[0] && data[0].src) {
            return "https://telegra.ph" + data[0].src;
        } else {
            throw new Error("Erreur lors de la récupération du lien de la vidéo");
        }
    } catch (err) {
        throw new Error(String(err));
    }
}

zokou({ nomCom: "url", categorie: "Conversion", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
    const { msgRepondu, repondre } = commandeOptions;

    if (!msgRepondu) {
        repondre('Veuillez mentionner une vidéo ou une image.');
        return;
    }

    let mediaPath;

    if (msgRepondu.videoMessage) {
        mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
    } else if (msgRepondu.imageMessage) {
        mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
    } else {
        repondre('Veuillez mentionner une vidéo ou une image.');
        return;
    }

    try {
        const telegraphUrl = await uploadToTelegraph(mediaPath);
        fs.unlinkSync(mediaPath);  // Supprime le fichier après utilisation

        repondre(telegraphUrl);
    } catch (error) {
        console.error('Erreur lors de la création du lien Telegraph :', error);
        repondre('Erreur lors de la création du lien Telegraph.');
    }
});

