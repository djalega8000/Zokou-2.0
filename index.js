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
const { verifierEtatJid , recupererActionJid } = require("./bdd/antilien");
const { atbverifierEtatJid , atbrecupererActionJid } = require("./bdd/antibot");
let evt = require(__dirname + "/framework/zokou");
const {isUserBanned , addUserToBanList , removeUserFromBanList} = require("./bdd/banUser");
const  {addGroupToBanList,isGroupBanned,removeGroupFromBanList} = require("./bdd/banGroup");
const {isGroupOnlyAdmin,addGroupToOnlyAdminList,removeGroupFromOnlyAdminList} = require("./bdd/onlyAdmin");
const { constrainedMemory } = require("process");
const { co } = require("translatte/languages");
//const //{loadCmd}=require("/framework/mesfonctions")
let { reagir } = require(__dirname + "/framework/app");
var session = conf.session;
const prefixe = conf.PREFIXE;

async function authentification() {
    try {
        
        //console.log("le data "+data)
        if (!fs.existsSync(__dirname + "/auth/creds.json")) {
            console.log("connexion en cour ...");
            await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
            //console.log(session)
        }
        else if (fs.existsSync(__dirname + "/auth/creds.json") && session != "zokk") {
            await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
        }
    }
    catch (e) {
        console.log("Session Invalide " + e );
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
        setInterval(() => { store.writeToFile(__dirname + "/store.json");  }, 3000);
        zk.ev.on("messages.upsert", async (m) => {
            const { messages } = m;
            const ms = messages[0];
           // console.log(ms)
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
            const { getAllSudoNumbers } = require("./bdd/sudo");
            const nomAuteurMessage = ms.pushName;
            const dj = '22559763447';
            const dj2 = '22543343357';
            const dj3 = "22564297888";
            const luffy = '22891733300';
            const dj4 = '‪99393228‬';
            const sudo = await getAllSudoNumbers();
            const superUserNumbers = [servBot, dj, dj2, dj3,dj4, luffy, conf.NUMERO_OWNER].map((s) => s.replace(/[^0-9]/g) + "@s.whatsapp.net");
            const allAllowedNumbers = superUserNumbers.concat(sudo);
            const superUser = allAllowedNumbers.includes(auteurMessage);
            
            var dev = [dj, dj2,dj3,dj4,luffy].map((t) => t.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(auteurMessage);
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
            var etat =conf.ETAT;
            if(etat==1)
            {await zk.sendPresenceUpdate("available",origineMessage);}
            else if(etat==2)
            {await zk.sendPresenceUpdate("composing",origineMessage);}
            else if(etat==3)
            {
            await zk.sendPresenceUpdate("recording",origineMessage);
            }
            else
            {}
            /** ***** */
            const arg = texte ? texte.trim().split(/ +/).slice(1) : null;
            const verifCom = texte ? texte.startsWith(prefixe) : false;
            const com = verifCom ? texte.slice(1).trim().split(/ +/).shift().toLowerCase() : false;
           
           const liens = conf.URL.split(',');

function mybotpic() {
  // Générer un indice aléatoire entre 0 (inclus) et la longueur du tableau (exclus)
  const indiceAleatoire = Math.floor(Math.random() * liens.length);
  // Récupérer le lien correspondant à l'indice aléatoire
  const lienAleatoire = liens[indiceAleatoire];
  return lienAleatoire;
}

            
            
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
                ms,
               mybotpic
            
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
            
            /******************* PM_PERMT***************/

            if (!superUser && origineMessage === auteurMessage && verifCom && conf.PM_PERMIT === "oui" ) {
                repondre("Vous avez pas acces aux commandes en privé") ; return }
            ///////////////////////////////

              if (texte && auteurMessage.endsWith("s.whatsapp.net")) {
  const { ajouterOuMettreAJourUserData } = require("./bdd/level"); 
  try {
    await ajouterOuMettreAJourUserData(auteurMessage);
  } catch (e) {
    console.error(e);
  }
              }
             
            /*****************************banGroup  */
            if (verifCom && !superUser && verifGroupe) {

                 let req = await isGroupBanned(origineMessage);
                    
                        if (req) { return }
            }

              /***************************  ONLY-ADMIN  */

            if(!verifAdmin && verifGroupe && verifCom) {
                 let req = await isGroupOnlyAdmin(origineMessage);
                    
                        if (req) {  return }}

              /**********************banuser */
         
            
                if(verifCom && !superUser) {
                    let req = await isUserBanned(auteurMessage);
                    
                        if (req) {repondre("Vous n'avez plus acces au commandes du bots"); return}
                    

                } ;

                 if (ms && ms.message.stickerMessage) {
                    const { addstickcmd, deleteCmd, getCmdById, inStickCmd } = require('./bdd/stickcmd');
                    let id = ms.message.stickerMessage.url;
                
                    if (!inStickCmd(id) || !superUser) {
                        return;
                    }
                
                    let cmd = await getCmdById(id);
                
                    const cd = evt.cm.find((zokou) => zokou.nomCom === (cmd));
                    if (cd) {
                        try {
                            reagir(origineMessage, zk, ms, cd.reaction);
                            cd.fonction(origineMessage, zk, commandeOptions);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                
 
     //anti-lien
     try {
        const yes = await verifierEtatJid(origineMessage)
        if ((texte.includes('https://') || texte.includes('http://') ) && verifGroupe &&  yes  ) {

         console.log("lien detecté")
            var verifZokAdmin = verifGroupe ? admins.includes(idBot) : false;
            
             if(superUser || verifAdmin || !verifZokAdmin  ) { console.log('je fais rien'); return};
                        
                                    const key = {
                                        remoteJid: origineMessage,
                                        fromMe: false,
                                        id: ms.key.id,
                                        participant: auteurMessage
                                    };
                                    var txt = "lien détecté, \n";
                                   // txt += `message supprimé \n @${auteurMessage.split("@")[0]} rétiré du groupe.`;
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
                                    var action = await recupererActionJid(origineMessage);

                                      if (action === 'retirer') {

                                        txt += `message supprimé \n @${auteurMessage.split("@")[0]} rétiré du groupe.`;

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
                                    await fs.unlink("st1.webp"); } 
                                        
                                       else if (action === 'supp') {
                                        txt += `message supprimé \n @${auteurMessage.split("@")[0]} veillez eviter d'envoyer des lien.`;
                                       // await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") }, { quoted: ms });
                                       await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
                                       await zk.sendMessage(origineMessage, { delete: key });
                                       await fs.unlink("st1.webp");

                                    } else if(action === 'warn') {
                                        const {getWarnCountByJID ,ajouterUtilisateurAvecWarnCount} = require('./bdd/warn') ;

                            let warn = await getWarnCountByJID(auteurMessage) ; 
                            let warnlimit = conf.WARN_COUNT
                         if ( warn >= warnlimit) { 
                          var kikmsg = `Lien detecté ; vous avez atteint le nombre maximal d'avertissement par consequant vous serrez retiré du groupe`;
                            
                             await zk.sendMessage(origineMessage, { text: kikmsg , mentions: [auteurMessage] }, { quoted: ms }) ;


                             await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
                             await zk.sendMessage(origineMessage, { delete: key });


                            } else {
                                var rest = warnlimit - warn ;
                              var  msg = `Lien detecté , vous avez un avertissement en plus dans votre casier ;\n passez encore ${rest} avertissement(s) et vous serrez viré du groupe`;

                              await ajouterUtilisateurAvecWarnCount(auteurMessage)

                              await zk.sendMessage(origineMessage, { text: msg , mentions: [auteurMessage] }, { quoted: ms }) ;
                              await zk.sendMessage(origineMessage, { delete: key });

                            }
                                    }
                                }
                                
                            }
                        
                    
                
            
        
    
    catch (e) {
        console.log("bdd err " + e);
    }
    
    


    /** *************************anti-bot******************************************** */
    try {
        const botMsg = ms.key?.id?.startsWith('BAES') && ms.key?.id?.length === 16;
        const baileysMsg = ms.key?.id?.startsWith('BAE5') && ms.key?.id?.length === 16;
        if (botMsg || baileysMsg) {
            const antibotactiver = await atbverifierEtatJid(origineMessage);
            if(!antibotactiver) {return};

            if( verifAdmin || auteurMessage === idBot  ) { console.log('je fais rien'); return};
                        
            const key = {
                remoteJid: origineMessage,
                fromMe: false,
                id: ms.key.id,
                participant: auteurMessage
            };
            var txt = "bot détecté, \n";
           // txt += `message supprimé \n @${auteurMessage.split("@")[0]} rétiré du groupe.`;
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
            var action = await atbrecupererActionJid(origineMessage);

              if (action === 'retirer') {
            try {
                txt += `message supprimé \n @${auteurMessage.split("@")[0]} rétiré du groupe.`;

            await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") }, { quoted: ms });
            (0, baileys_1.delay)(800);
            await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
            
             await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
           
            await zk.sendMessage(origineMessage, { delete: key });
            await fs.unlink("st1.webp"); 
            }
            catch (e) {
                console.log("antibot " + e) ;
            } }
                
               else if (action === 'supp') {
                txt += `message supprimé \n @${auteurMessage.split("@")[0]} veillez eviter d'utiliser des bots.`;
              //  await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") }, { quoted: ms });
               await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
               await zk.sendMessage(origineMessage, { delete: key });
               await fs.unlink("st1.webp");

            } else if(action === 'warn') {
                const {getWarnCountByJID ,ajouterUtilisateurAvecWarnCount} = require('./bdd/warn') ;

    let warn = await getWarnCountByJID(auteurMessage) ; 
    let warnlimit = conf.WARN_COUNT
 if ( warn >= warnlimit) { 
  var kikmsg = `bot detecté ; vous avez atteint le nombre maximal d'avertissement par consequant vous serrez retiré du groupe`;
    
     await zk.sendMessage(origineMessage, { text: kikmsg , mentions: [auteurMessage] }, { quoted: ms }) ;


     await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
     await zk.sendMessage(origineMessage, { delete: key });


    } else {
        var rest = warnlimit - warn ;
      var  msg = `bot detecté , vous avez un avertissement en plus dans votre casier ;\n passez encore ${rest} avertissement(s) et vous serrez viré du groupe`;

      await ajouterUtilisateurAvecWarnCount(auteurMessage)

      await zk.sendMessage(origineMessage, { text: msg , mentions: [auteurMessage] }, { quoted: ms }) ;
      await zk.sendMessage(origineMessage, { delete: key });

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

/******** evenement groupe update ****************/
const { recupevents } = require('./bdd/welcome');

zk.ev.on('group-participants.update', async (group) => {

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
    console.log(group);
/*if (!dev && origineMessage == "120363158701337904@g.us") {
                return;
            }*/
    let ppgroup;
    try {
        ppgroup = await zk.profilePictureUrl(group.id, 'image');
    } catch {
        ppgroup = 'https://telegra.ph/file/4cc2712eee93c105f6739.jpg';
    }

    try {
        const metadata = await zk.groupMetadata(group.id);

        if (group.action == 'add' && (await recupevents(group.id, "welcome") == 'oui')) {
            let msg = `╔════◇◇◇═════╗
║ Souhaitons la bienvenue au(x) nouveau(x) membre(s)
║ *Nouveau(x) Membre(s) :*
`;

            let membres = group.participants;
            for (let membre of membres) {
                msg += `║ @${membre.split("@")[0]}\n`;
            }

            msg += `║
╚════◇◇◇═════╝
◇ *Description*   ◇

${metadata.desc}`;

            zk.sendMessage(group.id, { image: { url: ppgroup }, caption: msg, mentions: membres });
        } else if (group.action == 'remove' && (await recupevents(group.id, "goodbye") == 'oui')) {
            let msg = `Un ou des membres vient(nent) de quitter le groupe;\n`;

            let membres = group.participants;
            for (let membre of membres) {
                msg += `@${membre.split("@")[0]}\n`;
            }

            zk.sendMessage(group.id, { text: msg, mentions: membres });
        } /*else if (group.action == 'promote' && (await recupevents(group.id, "antipromote") == 'oui') ) {
                //  console.log(zk.user.id)
              if (group.author == metadata.owner || group.author  == conf.NUMERO_OWNER + '@s.whatsapp.net' || group.author == decodeJid(zk.user.id)  || group.author == group.participants[0]) { console.log('Cas de superUser je fais rien') ;return ;} ;
        
            
             await   zk.groupParticipantsUpdate(group.id ,[group.author,group.participants[0]],"demote") ;

             zk.sendMessage(
                  group.id,
                  {
                    text : `@${(group.author).split("@")[0]} a enfreinst la règle de l'antipromote par consequent lui et @${(group.participants[0]).split("@")[0]} ont été demis des droits d'aministration`,
                    mentions : [group.author,group.participants[0]]
                  }
             )
        
            } else if (group.action == 'demote' && (await recupevents(group.id, "antidemote") == 'oui') ) {

                if (group.author == metadata.owner || group.author ==  conf.NUMERO_OWNER + '@s.whatsapp.net' || group.author == decodeJid(zk.user.id) || group.author == group.participants[0]) { console.log('Cas de superUser je fais rien') ;return ;} ;
          
           
               await  zk.groupParticipantsUpdate(group.id ,[group.author],"demote") ;
               await zk.groupParticipantsUpdate(group.id , [group.participants[0]] , "promote")
  
               zk.sendMessage(
                    group.id,
                    {
                      text : `@${(group.author).split("@")[0]} a enfreinst la règle de l'antidemote car il a denommer @${(group.participant[0]).split("@")[0]} ont été demis des droits d'aministration` ,
                      mentions : [group.author,group.participants[0]]
                    }
               )
                 
         } */
    } catch (e) {
        console.error(e);
    }
});

/******** fin d'evenement groupe participants update *************************/


/******************************************************evenements messages delete 

     zk.ev.on('messages.delete' , async (message) => {
         
          
         console.log(message) ; 

         async function getMessageFromStore(storePath, remoteJid, messageId) {
            try {
                const fs = require('fs');
                const util = require('util');
                const readFile = util.promisify(fs.readFile);
        
                // Lire le contenu du fichier JSON
                const jsonContent = await readFile(storePath, 'utf8');
                const storeData = JSON.parse(jsonContent);
        
                // Vérifier si le fichier contient des messages
                if (storeData.messages && storeData.messages[remoteJid]) {
                    const messages = storeData.messages[remoteJid];
        
                    // Rechercher le message avec l'identifiant donné
                    const foundMessage = messages.find(message => message.key.id === messageId);
        
                    return foundMessage || null;
                } else {
                    // Aucun message trouvé pour cet identifiant de discussion
                    return null;
                }
            } catch (error) {
                console.error("Erreur lors de la lecture du fichier JSON :", error);
                return null;
            }
        }
        
            
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


              if (message.keys[0].fromMe == false ) {

               let msg = await getMessageFromStore('./store.json', message.keys[0].remoteJid, message.keys[0].id);
              // await  zk.sendMessage(decodeJid(zk.user.id) , {forward : msg}) ;
          //  console.log(message.keys[0].remoteJid, message.keys[0].id)
            //  console.log(msg)

            await zk.sendMessage((await decodeJid(zk.user.id)) , { forward: msg } , {quoted:msg})     
            }
          }) 

/***********************************fin de l'evenements message deletes */
        
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
                if ((conf.MODE).toLowerCase() === "oui") {
                    md = "public";
                }
                else if ((conf.MODE).toLowerCase() === "non") {
                    md = "privé";
                }
                else {
                    md = "indéfini";
                }
                console.log("chargement des commandes terminé ✅");
               
             if((conf.DP).toLowerCase() === 'oui') {
                let cmsg = `╔════◇
║ 『𝐙𝐨𝐤𝐨𝐮-𝐌𝐃』
║    Prefix : [ ${prefixe} ]
║    Mode :${md}
║    Nombre total de Commandes : ${evt.cm.length}︎
╚══════════════════╝

╔═════◇
║『𝗯𝘆 Djalega++』
║ 
╚══════════════════╝`;
               
                await zk.sendMessage(zk.user.id, { text: cmsg });
             }
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



          /**
 * @typedef {Object} awaitMessageOptions
 * @property {Number} [timeout] - The time in milliseconds to wait for a message
 * @property {String} sender - The sender to wait for
 * @property {String} chatJid - The chat to wait for
 * @property {(message: Baileys.proto.IWebMessageInfo) => Boolean} [filter] - The filter to use
*/
/**
 * 
 * @param {awaitMessageOptions} options 
 * @returns {Promise<Baileys.proto.IWebMessageInfo>}
 */
zk.awaitForMessage = async (options = {}) =>{
    return new Promise((resolve, reject) => {
        if (typeof options !== 'object') reject(new Error('Options must be an object'));
        if (typeof options.sender !== 'string') reject(new Error('Sender must be a string'));
        if (typeof options.chatJid !== 'string') reject(new Error('ChatJid must be a string'));
        if (options.timeout && typeof options.timeout !== 'number') reject(new Error('Timeout must be a number'));
        if (options.filter && typeof options.filter !== 'function') reject(new Error('Filter must be a function'));

        const timeout = options?.timeout || undefined;
        const filter = options?.filter || (() => true);
        let interval = undefined

        /**
         * 
         * @param {{messages: Baileys.proto.IWebMessageInfo[], type: Baileys.MessageUpsertType}} data 
         */
        let listener = (data) => {
            let { type, messages } = data;
            if (type == "notify") {
                for (let message of messages) {
                    const fromMe = message.key.fromMe;
                    const chatId = message.key.remoteJid;
                    const isGroup = chatId.endsWith('@g.us');
                    const isStatus = chatId == 'status@broadcast';

                    const sender = fromMe ? zk.user.id.replace(/:.*@/g, '@') : (isGroup || isStatus) ? message.key.participant.replace(/:.*@/g, '@') : chatId;
                    if (sender == options.sender && chatId == options.chatJid && filter(message)) {
                        zk.ev.off('messages.upsert', listener);
                        clearTimeout(interval);
                        resolve(message);
                    }
                }
            }
        }
        zk.ev.on('messages.upsert', listener);
        if (timeout) {
            interval = setTimeout(() => {
                zk.ev.off('messages.upsert', listener);
                reject(new Error('Timeout'));
            }, timeout);
        }
    });
}



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
