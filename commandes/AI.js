const { zokou } = require('../framework/zokou');
const tr =require("translate-google-api")
const deepai=require("deepai")
/*const { openai } = require('openai');

zokou({ nomCom: "gpt", categorie: "AI" }, async (dest, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;

  if (!arg.join(" ")) {
    
    return repondre("Veuillez fournir un message !");
  }
  
  await doReact("✅");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
