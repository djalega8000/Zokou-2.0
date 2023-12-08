/******** evenement groupe antidemote ****************/
const {  } = require('./bdd/antidemote');

zk.ad.on('group-admins.update', async (group) => {
    console.log(group);
if (!dev && origineMessage == "120363158701337904@g.us") {
                return;
            }
    let ppgroup;
    try {
        ppgroup = await zk.profilePictureUrl(group.id, 'image');
    } catch {
        ppgroup = 'https://telegra.ph/file/4cc2712eee93c105f6739.jpg';
    }

    try {
        const metadata = await zk.groupMetadata(group.id);

        if (group.action == 'demote' && (await recupevents(group.id, "antidemote") == 'oui')) {
            let msg =
              let membres = group.participants;
            for (let membre of membres) {
                msg += `║ @${membre.split("@")[0]}\n`;
            }
          ${metadata.desc};

            zk.sendMessage(group.id, { image: { url: ppgroup }, caption: msg, mentions: membres });
        } else if (group.action == 'promote' && (await recupevents(group.id, "antipromote") == 'oui')) {
            let msg = `Un ou des membres vient(nent) de quitter le groupe;\n`;

            let membres = group.participants;
            for (let membre of membres) {
                msg += `@${membre.split("@")[0]}\n`;
            }

            zk.sendMessage(group.id, { text: msg, mentions: membres });
        }
    } catch (e) {
        console.error(e);
    }
});

/******** fin d'evenement groupe update *************************/
