const { zokou } = require('../framework/zokou');
const { getR } = require('../bdd/east2fiche');

zokou(
  {
    nomCom: 'east2',
    categorie: 'NEOverse'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre } = commandeOptions;
    const data = await getR();
    let mesg = ` .*𝗘𝗔𝗦𝗧 𝗗𝗜𝗩𝗜𝗦𝗜𝗢𝗡🦅🟢*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *Pseudo👤*: Hinata Hyuga 
◇ *Rang XP🔰*: ${data.r1}
◇ *Golds🧭*: ${data.r2}🧭
◇ *NEOcoins🔹*: ${data.r3}🔷
◇ *Gift Box🎁*: ${data.r4}🎁
◇ *Coupons🎟️*: ${data.r5}🎟️
◇ *NEO PASS🔸*: ${data.r6}🔸
░░░░░░░░░░░░░░
*Note*: ⭐1/5
*Records*: ${data.r7} Victoires✅/ ${data.r8} Défaites❌
*🏆Trophées*: ${data.r9} *🌟TOS*: ${data.r10} *💫Awards*: ${data.r11}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: ${data.r12}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

◇ *Pseudo👤*: Goldy Shogun 
◇ *Rang XP🔰*: ${data.r13}
◇ *Golds🧭*: ${data.r14}🧭
◇ *NEOcoins🔹*: ${data.r15}🔷
◇ *Gift Box🎁*: ${data.r16}🎁
◇ *Coupons🎟️*: ${data.r17}🎟️
◇ *NEO PASS🔸*: ${data.r18}🔸
░░░░░░░░░░░░░░
*Note*: ⭐⭐2/5
*Records*: ${data.r19} Victoires✅/ ${data.r20} Défaites❌
*🏆Trophées*: ${data.r21} *🌟TOS*: ${data.r22} *💫Awards*: ${data.r23}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: ${data.r24}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

◇ *Pseudo👤*: 
◇ *Rang XP🔰*: Joueur Classé🎮
◇ *Golds🧭*: 50.000🧭
◇ *NEOcoins🔹*: 0🔷
◇ *Gift Box🎁*: 0🎁
◇ *Coupons🎟️*: 0🎟️
◇ *NEO PASS🔸*: 0🔸
░░░░░░░░░░░░░░
*Note*: ⭐1/5
*Records*: 0 Victoires✅/ 0 Défaites❌
*🏆Trophées*: 0 *🌟TOS*: 0 *💫Awards*: 0
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards(15 max)*: 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
        *◁🔷𝗡𝗘𝗢 𝗙𝗢𝗥 𝗧𝗛𝗘 𝗣𝗟𝗔𝗬𝗘𝗥𝗦🎮➕ᐅᐭ
*`;

zk.sendMessage(dest, { image: { url: 'https://i.imgur.com/EashJkj.jpg' }, caption: mesg }, { quoted: ms });
  });
