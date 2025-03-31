const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0JFaXgyb1poLy95L3ZMZkJYanQ1TUh2dVVKeFl1RGZBNEl2V25uVjRsdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWnlVRkVHTmZRZFNCTE8rOTV2QitHZ3NKdGtPWkRMbkhqZERFTjZSQi95MD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLSUk4QW9EWjJSQmVvamJXK1RQYlVjdHNyWHRUVmRORndiZzdTVXBZbWwwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtdnJoSWtnY2F1cldBS0lIZG01cEk2bnpveGU0VHcwcCtxalhSdWlkVEZRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZKL29udlFQUzIzZjRORkNXQlJtVnkwMUF5dGVYR2tpWmo3cGFDSTVvRnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpwUTZHL09sM1RuaFlTeUNGV2JDSDRCNnRjL2liWUFnMFRqbXExWnF0bEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU5teCs0L2xEK2FNNklRZFNnc0RaaHl3VkltSFdYeW02bUZJcmxwUlIyaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUlCeG1HTHhqQlJ2cnBBTzdvaGl6S2szSnhDWDcwM0xkV3UxUEZPTEVGdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjQ3NEhvMmRORktPMHJVTEZmUWVLOEt2MG1PbTJPZFVmSExRUm81WGNRT0pCaDZ0RXJ0Y1h0NXcxQU1XU1hoRUhuVHBONnlWR2NoeGJuZm0xTWFXL0RnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEyLCJhZHZTZWNyZXRLZXkiOiJFV3ZVNjZSbkF6UWROb0tpUmhDNFJTeUhuRk9COG0zNzc3WmFsaE4xcFR3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6ZmFsc2UsImFjY291bnQiOnsiZGV0YWlscyI6IkNNcnBsZ0VRNE5mYXZRWVlCaUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ0eXZ0eXhVaStCdXhIN2RsTXh6ZGNkdU5MN1ZWRG5yRGV0M0JWRUZDUVhnPSIsImFjY291bnRTaWduYXR1cmUiOiJ0d3lPQnBUMEk3K1ViSzFiVHdUeHNLVFowKzlla3VyNitNVk1mL0ZUWEFIOU16c0lrdFRRUnQyeWlndE40MzlveGpmUVdwWXV0VzNKTVBVRFdjMU1Cdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVTFYSi9ycTVQaGZUbWYvZzUzdkF1bEhOK3ZiMDZ4YlhBbW82a1ptbXpTektDZHFqOFNhbmlWSkttL3BPSFJGZWp0TS8ySVNEMFN6VXJ0MWdhWThNQUE9PSJ9LCJtZSI6eyJpZCI6IjUwOTQxNjEwMzQ3Ojk3QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjQyMDEzMTUyNzY0MTExOjk3QGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MDk0MTYxMDM0Nzo5N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiY3I3Y3NWSXZnYnNSKzNaVE1jM1hIYmpTKzFWUTU2dzNyZHdWUkJRa0Y0In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDAwMjQ4MDMsImxhc3RQcm9wSGFzaCI6IjJQMVloZiJ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
