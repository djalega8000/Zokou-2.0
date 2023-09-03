"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baileys_1 = __importStar(require("@sampandey001/baileys"));
const logger_1 = __importDefault(require("@sampandey001/baileys/lib/Utils/logger"));
const logger = logger_1.default.child({});
logger.level = 'silent';
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
const axios = require("axios");
let fs = require("fs-extra");
let path = require("path");
const FileType = require('file-type');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
//import chalk from 'chalk'
const { getGroupe, getAntibot, ajouterAntibot } = require("./bdd");
const { ajouterGroupe } = require("./bdd/groupe");
let evt = require(__dirname + "/framework/zokou");
//const //{loadCmd}=require("/framework/mesfonctions")
let { reagir } = require(__dirname + "/framework/app");
var session = conf.session;
const prefixe = conf.PREFIXE;
var lienPaste = 'https://paste.c-net.org/';
if (session != '') {
    var priseSession = session.replace(/Z-O-K-O-U_MD-/gi, "");
    //console.log(priseSession)
    //console.log('https://paste.c-net.org/' + priseSession)}
    /* console.log(chalk.green("Zokou-Md"))*/
}
async function authentification() {
    try {
        let { data } = await axios.get(lienPaste + priseSession);
        //console.log("le data "+data)
        if (!fs.existsSync(__dirname + "/auth/creds.json")) {
            console.log("connexion en cour ...");
            await fs.writeFileSync(__dirname + "/auth/creds.json", atob(data), "utf8");
            //console.log(session)
        }
        else if (fs.existsSync(__dirname + "/auth/creds.json")) {
            await fs.writeFileSync(__dirname + "/auth/creds.json", atob(data), "utf8");
        }
    }
    catch (e) {
        console.log("Session Invalide ");
        return;
    }
}
authentification();
const store = (0, baileys_1.makeInMemoryStore)({
    logger: pino().child({ level: "silent", stream: "store" }),
});
setTimeout(() => {
    async function main() {
        const { version, isLatest } = await (0, baileys_1.fetchLatestBaileysVersion)();
        const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(__dirname + "/auth");
        const sockOptions = {
            version,
            logger: pino({ level: "silent" }),
            browser: ['Zokou-Md', "safari", "1.0.0"],
            printQRInTerminal: true,
            /* auth: state*/ auth: {
                creds: state.creds,
                /** caching makes the store faster to send/recv messages */
                keys: (0, baileys_1.makeCacheableSignalKeyStore)(state.keys, logger),
            },
            //////////
            getMessage: async (key) => {
                if (store) {
                    const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
                    return msg.message || undefined;
                }
                return {
                    conversation: 'An Error Occurred, Repeat Command!'
                };
            }
            ///////
        };
        const zk = (0, baileys_1.default)(sockOptions);
        store.bind(zk.ev);
        setInterval(() => { store.writeToFile("stor.json"); }, 3000);
        zk.ev.on("messages.upsert", async (m) => {
            const { messages } = m;
            const ms = messages[0];
            if (!ms.message)
                return;
            const decodeJid = (jid) => {
                if (!jid)
                    return jid;
                if (/:\d+@/gi.test(jid)) {
                    let decode = (0, baileys_1.jidDecode)(jid) || {};
                    return decode.user && decode.server && decode.user + '@' + decode.server || jid;
                }
                else
                    return jid;
            };
            var mtype = (0, baileys_1.getContentType)(ms.message);
            var texte = mtype == "conversation" ? ms.message.conversation : mtype == "imageMessage" ? ms.message.imageMessage?.caption : mtype == "videoMessage" ? ms.message.videoMessage?.caption : mtype == "extendedTextMessage" ? ms.message?.extendedTextMessage?.text : mtype == "buttonsResponseMessage" ?
                ms?.message?.buttonsResponseMessage?.selectedButtonId : mtype == "listResponseMessage" ?
                ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId : mtype == "messageContextInfo" ?
                (ms?.message?.buttonsResponseMessage?.selectedButtonId || ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId || ms.text) : "";
            var origineMessage = ms.key.remoteJid;
            var idBot = decodeJid(zk.user.id);
            var servBot = idBot.split('@')[0];
            /* const dj='22559763447';
             const dj2='2250143343357';
             const luffy='22891733300'*/
            /*  var superUser=[servBot,dj,dj2,luffy].map((s)=>s.replace(/[^0-9]/g)+"@s.whatsapp.net").includes(auteurMessage);
              var dev =[dj,dj2,luffy].map((t)=>t.replace(/[^0-9]/g)+"@s.whatsapp.net").includes(auteurMessage);*/
            const verifGroupe = origineMessage?.endsWith("@g.us");
            var infosGroupe = verifGroupe ? await zk.groupMetadata(origineMessage) : "";
            var nomGroupe = verifGroupe ? infosGroupe.subject : "";
            var msgRepondu = ms.message.extendedTextMessage?.contextInfo?.quotedMessage;
            var auteurMsgRepondu = decodeJid(ms.message?.extendedTextMessage?.contextInfo?.participant);
            //ms.message.extendedTextMessage?.contextInfo?.mentionedJid
            // ms.message.extendedTextMessage?.contextInfo?.quotedMessage.
            var mr = ms.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            var utilisateur = mr ? mr : msgRepondu ? auteurMsgRepondu : "";
            var auteurMessage = verifGroupe ? (ms.key.participant ? ms.key.participant : ms.participant) : origineMessage;
            if (ms.key.fromMe) {
                auteurMessage = idBot;
            }
            var membreGroupe = verifGroupe ? ms.key.participant : '';
            const nomAuteurMessage = ms.pushName;
            const dj = '22559763447';
            const dj2 = '22543343357';
          const dj3="22564297888"
            const luffy = '22891733300';
            var superUser = [servBot, dj, dj2,dj3,luffy,conf.NUMERO_OWNER].map((s) => s.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(auteurMessage);
            var dev = [dj, dj2,dj3,luffy].map((t) => t.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(auteurMessage);
            function repondre(mes) { zk.sendMessage(origineMessage, { text: mes }, { quoted: ms }); }
            console.log("\t [][]...{Zokou-Md}...[][]");
            console.log("=========== Nouveau message ===========");
            if (verifGroupe) {
                console.log("message provenant du groupe : " + nomGroupe);
            }
            console.log("message envoyé par : " + "[" + nomAuteurMessage + " : " + auteurMessage.split("@s.whatsapp.net")[0] + " ]");
            console.log("type de message : " + mtype);
            console.log("------ contenu du message ------");
            console.log(texte);
            /**  */
            function groupeAdmin(membreGroupe) {
                let admin = [];
                for (m of membreGroupe) {
                    if (m.admin == null)
                        continue;
                    admin.push(m.id);
                }
                // else{admin= false;}
                return admin;
            }
            const mbre = verifGroupe ? await infosGroupe.participants : '';
            //  const verifAdmin = verifGroupe ? await mbre.filter(v => v.admin !== null).map(v => v.id) : ''
            let admins = verifGroupe ? groupeAdmin(mbre) : '';
            const verifAdmin = verifGroupe ? admins.includes(auteurMessage) : false;
            var verifZokouAdmin = verifGroupe ? admins.includes(idBot) : false;
            /** ** */
            /** ***** */
            const arg = texte ? texte.trim().split(/ +/).slice(1) : null;
            const verifCom = texte ? texte.startsWith(prefixe) : false;
            const com = verifCom ? texte.slice(1).trim().split(/ +/).shift().toLowerCase() : false;
            var commandeOptions = {
                superUser, dev,
                verifGroupe,
                mbre,
                membreGroupe,
                verifAdmin,
                infosGroupe,
                nomGroupe,
                auteurMessage,
                nomAuteurMessage,
                idBot,
                verifZokouAdmin,
                prefixe,
                arg,
                repondre,
                mtype,
                groupeAdmin,
                msgRepondu,
                auteurMsgRepondu,
                ms
            };
            /** ****** gestion auto-status  */
            if (ms.key && ms.key.remoteJid === "status@broadcast" && conf.LECTURE_AUTO_STATUS === "oui") {
                await zk.readMessages([ms.key]);
            }
            if (ms.key && ms.key.remoteJid === 'status@broadcast' && conf.TELECHARGER_AUTO_STATUS === "oui") {
                /* await zk.readMessages([ms.key]);*/
                if (ms.message.extendedTextMessage) {
                    var stTxt = ms.message.extendedTextMessage.text;
                    await zk.sendMessage(idBot, { text: stTxt }, { quoted: ms });
                }
                else if (ms.message.imageMessage) {
                    var stMsg = ms.message.imageMessage.caption;
                    var stImg = await zk.downloadAndSaveMediaMessage(ms.message.imageMessage);
                    await zk.sendMessage(idBot, { image: { url: stImg }, caption: stMsg }, { quoted: ms });
                }
                else if (ms.message.videoMessage) {
                    var stMsg = ms.message.videoMessage.caption;
                    var stVideo = await zk.downloadAndSaveMediaMessage(ms.message.videoMessage);
                    await zk.sendMessage(idBot, {
                        video: { url: stVideo }, caption: stMsg
                    }, { quoted: ms });
                }
                /** *************** */
                // console.log("*nouveau status* ");
            }
            /** ******fin auto-status */
            if (!dev && origineMessage == "120363158701337904@g.us") {
                return;
            }
            ///////////////////////////////
            //anti-lien
            try {
                if (texte.includes('https://') && verifGroupe) {
                    var verifZokAdmin = verifGroupe ? admins.includes(idBot) : false;
                    let req = await getGroupe(origineMessage);
                    // console.log("la bd " + Object.values(req))
                    for (var a = 0; a < req.length; a++) {
                        if (req[a].id === origineMessage) {
                            console.log("reponse " + req[a].antilien + "\n\n");
                            if (req[a].antilien == "oui") {
                                console.log('  lien détecté'); /*repondre("\tlien détecté");*/
                                console.log("le dev " + dev);
                                console.log("zok admin " + verifZokouAdmin);
                                if (!dev || !superUser) {
                                    if (verifZokouAdmin) {
                                        if (!verifAdmin) {
                                            const key = {
                                                remoteJid: origineMessage,
                                                fromMe: false,
                                                id: ms.key.id,
                                                participant: auteurMessage
                                            };
                                            var txt = "lien détecté, \n";
                                            txt += `message supprimé \n @${auteurMessage.split("@")[0]} rétiré du groupe.`;
                                            const gifLink = "https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif";
                                            var sticker = new Sticker(gifLink, {
                                                pack: 'Zoou-Md',
                                                author: conf.NOM_OWNER,
                                                type: StickerTypes.FULL,
                                                categories: ['🤩', '🎉'],
                                                id: '12345',
                                                quality: 50,
                                                background: '#000000'
                                            });
                                            await sticker.toFile("st1.webp");
                                            // var txt = `@${auteurMsgRepondu.split("@")[0]} a été rétiré du groupe..\n`
                                            await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") }, { quoted: ms });
                                            (0, baileys_1.delay)(800);
                                            await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
                                            try {
                                                await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
                                            }
                                            catch (e) {
                                                console.log("antiien ") + e;
                                            }
                                            await zk.sendMessage(origineMessage, { delete: key });
                                            await fs.unlink("st1.webp");
                                        }
                                        else {
                                            repondre("Lien envoyé par un administrateur du groupe impossible de le retirer.");
                                        }
                                    }
                                    else {
                                        repondre("Désolé je suis pas administrateur du groupe .");
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (e) {
                console.log("bdd err " + e);
            }
            /*
      
              */
            /** *************************anti-bot******************************************** */
            try {
                const botMsg = ms.key?.id?.startsWith('BAES') && ms.key?.id?.length === 16;
                const baileysMsg = ms.key?.id?.startsWith('BAE5') && ms.key?.id?.length === 16;
                if (botMsg || baileysMsg) {
                    var verifZokAdmin = verifGroupe ? admins.includes(idBot) : false;
                    let req = await getAntibot(origineMessage);
                    for (var i = 0; i < req.length; i++) {
                        if (req[i].groupejid === origineMessage) {
                            if (req[i].etat === "oui") {
                                if (!superUser || !dev) {
                                    if (verifZokAdmin) {
                                        if (!verifAdmin) {
                                            const key = {
                                                remoteJid: origineMessage,
                                                fromMe: false,
                                                id: ms.key.id,
                                                participant: auteurMessage
                                            };
                                            var { stick, genererNomFichier } = require('./framework');
                                            const nomFichier = await genererNomFichier('webp');
                                            var st = await stick("./media/antibot.gif", "Zokou-MD");
                                            await st.toFile(nomFichier);
                                            var txt = "*Bot détecté*, \n";
                                            txt += `message supprimé \n @${auteurMessage.split("@")[0]} 
                             rétiré 
                                    du groupe.`;
                                            await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("./" + nomFichier) }, { quoted: ms });
                                            (0, baileys_1.delay)(800);
                                            await fs.unlink("./" + nomFichier);
                                            /* try{await zk.sendMessage(origineMessage,{text:txt,mentions:[auteurMessage]},{quoted:ms}) ;}catch(e){console.log("gggg "+e)}*/
                                            try {
                                                await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
                                            }
                                            catch (e) {
                                                console.log("antibot ") + e;
                                            }
                                            await zk.sendMessage(origineMessage, { delete: key });
                                        }
                                        else {
                                            repondre("*Bot détecté*\n impossible de e retirer car il est administrateur du groupe.");
                                            return;
                                        }
                                    }
                                }
                                //  repondre("*Bot détecté .*");
                            }
                        }
                    }
                }
            }
            catch (er) {
                console.log('.... ' + er);
            }
            /////////////////////////
            if (conf.MODE != 'oui' && !superUser) {
                return;
            }
            //execution des commandes   
            if (verifCom) {
                //await await zk.readMessages(ms.key);
                const cd = evt.cm.find((zokou) => zokou.nomCom === (com));
                if (cd) {
                    try {
                        reagir(origineMessage, zk, ms, cd.reaction);
                        cd.fonction(origineMessage, zk, commandeOptions);
                    }
                    catch (e) {
                        console.log("😡😡 " + e);
                        zk.sendMessage(origineMessage, { text: "😡😡 " + e }, { quoted: ms });
                    }
                }
            }
            //fin exécution commandes
        });
        //fin événement message
        //événement contact
        zk.ev.on("contacts.upsert", async (contacts) => {
            const insertContact = (newContact) => {
                for (const contact of newContact) {
                    if (store.contacts[contact.id]) {
                        Object.assign(store.contacts[contact.id], contact);
                    }
                    else {
                        store.contacts[contact.id] = contact;
                    }
                }
                return;
            };
            insertContact(contacts);
        });
        //fin événement contact 
        //événement connexion
        zk.ev.on("connection.update", async (con) => {
            const { lastDisconnect, connection } = con;
            if (connection === "connecting") {
                console.log("ℹ️ Connexion en cours...");
            }
            else if (connection === 'open') {
                console.log("✅ connexion reussie! ☺️");
                console.log("--");
                await (0, baileys_1.delay)(200);
                console.log("------");
                await (0, baileys_1.delay)(300);
                console.log("------------------/-----");
                console.log("le bot est en ligne 🕸\n\n");
                //chargement des commandes 
                console.log("chargement des commandes ...\n");
                fs.readdirSync(__dirname + "/commandes").forEach((fichier) => {
                    if (path.extname(fichier).toLowerCase() == (".js")) {
                        try {
                            require(__dirname + "/commandes/" + fichier);
                            console.log(fichier + " installé ✔️");
                        }
                        catch (e) {
                            console.log(`${fichier} n'a pas pu être chargé pour les raisons suivantes : ${e}`);
                        } /* require(__dirname + "/commandes/" + fichier);
                         console.log(fichier + " installé ✔️")*/
                        (0, baileys_1.delay)(300);
                    }
                });
                (0, baileys_1.delay)(700);
                var md;
                if (conf.MODE === "oui") {
                    md = "public";
                }
                else if (conf.MODE === "non") {
                    md = "privé";
                }
                else {
                    md = "indéfini";
                }
                console.log("chargement des commandes terminé ✅");
                let cmsg = `╔════◇
║ 『𝐙𝐨𝐤𝐨𝐮-𝐌𝐃』
║    Prefix : [ ${prefixe} ]
║    Mode :${md}
║    Total Commandes : ${evt.cm.length}︎
╚══════════════════╝

╔═════◇
║『𝗯𝘆 Djalega++』
║ 
╚══════════════════╝`;
                await zk.sendMessage(zk.user.id, { text: cmsg });
            }
            else if (connection == "close") {
                let raisonDeconnexion = new boom_1.Boom(lastDisconnect?.error)?.output.statusCode;
                if (raisonDeconnexion === baileys_1.DisconnectReason.badSession) {
                    console.log('Session id érronée veuillez rescanner le qr svp ...');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionClosed) {
                    console.log('!!! connexion fermée, reconnexion en cours ...');
                    main();
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionLost) {
                    console.log('connexion au serveur perdue 😞 ,,, reconnexion en cours ... ');
                    main();
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason?.connectionReplaced) {
                    console.log('connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.loggedOut) {
                    console.log('vous êtes déconnecté,,, veuillez rescanner le code qr svp');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.restartRequired) {
                    console.log('redémarrage en cours ▶️');
                    main();
                }
                // sleep(50000)
                console.log("hum " + connection);
                main(); //console.log(session)
            }
        });
        //fin événement connexion
        //événement authentification 
        zk.ev.on("creds.update", saveCreds);
        //fin événement authentification 
        //
        /** ************* */
        //fonctions utiles
        zk.downloadAndSaveMediaMessage = async (message, filename = '', attachExtension = true) => {
            let quoted = message.msg ? message.msg : message;
            let mime = (message.msg || message).mimetype || '';
            let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
            const stream = await (0, baileys_1.downloadContentFromMessage)(quoted, messageType);
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            let type = await FileType.fromBuffer(buffer);
            let trueFileName = './' + filename + '.' + type.ext;
            // save to file
            await fs.writeFileSync(trueFileName, buffer);
            return trueFileName;
        };
        // fin fonctions utiles
        /** ************* */
        return zk;
    }
    let fichier = require.resolve(__filename);
    fs.watchFile(fichier, () => {
        fs.unwatchFile(fichier);
        console.log(`mise à jour ${__filename}`);
        delete require.cache[fichier];
        require(fichier);
    });
    main();
}, 5000);
