import  nodemailer from  'nodemailer'


export const getCommandFromClient = async (commandDeatil) =>{

    console.log(command)

    // const name = commandDeatil.user.name
    // const phone = 0
    // const commandArr = commandDeatil.commande
    // let command = ''

    // commandArr.forEach(item => {
    //   command+=item
    // });
    
    //   // Créer un transporteur SMTP
    //   const transporter = nodemailer.createTransport({
    //     service : 'gmail',
    //     auth: {
    //       user: process.env.NM_EMAIL,
    //       pass: process.env.NM_PASSWORD
    //     }
    //   });
    
    //   // Configurer les options de l'e-mail
    //   let mailOptions = {
    //     to: process.env.NM_EMAIL, 
    //     subject: `Nouvelle commande de ${name}, tel: ${phone} `,
    //     html: command
    
    //   };
    
    //   try {
    //     // Envoyer l'e-mail
    //     let info = await transporter.sendMail(mailOptions);
    //     console.log('E-mail envoyé :', info.messageId);
    //   res.json({message : 'Votre commande a bien été réçu .Nous vous contactrons plus tard'});
  
    //   } catch (error) {
    //     console.log('Erreur lors de l\'envoi de l\'e-mail :', error);
    //     res.json({message : 'Une erreur est survenue, veillez ressayer plus tard'});
  
    //   }
  
} 
