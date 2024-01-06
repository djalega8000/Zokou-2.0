const {zokou }= require ('../framework/zokou') ;
const {addstickcmd, deleteCmd, getCmdById, inStickCmd , getAllStickCmds} = require('../bdd/stickcmd') ;



zokou(
    {
        nomCom : 'setcmd',
        categorie : 'stickcmd'
        
    }, async (dest,zk,commandeOptions) => { 

   const {ms , arg, repondre,superUser , msgRepondu} = commandeOptions;

    if (!superUser) { repondre('commande reservé au moderateur') ; return} ;

      if(msgRepondu && msgRepondu.stickerMessage )  {
  
         if(!arg || !arg[0]) { repondre('Veillez entrer le nom de la commande que vous voulez assigner au sticker') ; return} ;
          
        
         await addstickcmd(arg[0].toLowerCase() , msgRepondu.stickerMessage.url ) ;

         repondre('Stick cmd enregister')

      } else {

        repondre('Veillez mentionner un sticker')
      }

    }) ; 

    zokou(
      {
          nomCom: 'delcmd',
          categorie: 'stickcmd'
      },
      async (dest, zk, commandeOptions) => {
  
          const { ms, arg, repondre, superUser } = commandeOptions;
  
          if (!superUser) {
              repondre('Commande réservée aux modérateurs');
              return;
          }
  
          if (!arg || !arg[0]) {
              repondre('Veuillez entrer le nom de la commande que vous voulez supprimer');
              return;
          }
  
          const cmdToDelete = arg[0];

  
          try {
              await deleteCmd(cmdToDelete.toLowerCase());
              repondre(`La commande ${cmdToDelete} a été supprimée de la liste des stickcmds.`);
          } catch {
              repondre(`La commande ${cmdToDelete} n'existe pas dans la liste des stickcmds.`);
          }
      }
  );
  

  zokou(
    {
        nomCom: 'allcmd',
        categorie: 'stickcmd'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, superUser } = commandeOptions;

        if (!superUser) {
            repondre('Commande réservée aux modérateurs');
            return;
        }

        const allCmds = await getAllStickCmds();

        if (allCmds.length > 0) {
            const cmdList = allCmds.map(cmd => cmd.cmd).join(', ');
            repondre(`Liste de toutes les commandes stickcmd :
 ${cmdList}`);
        } else {
            repondre('Aucune commande stickcmd enregistrée.');
        }
    }
);
