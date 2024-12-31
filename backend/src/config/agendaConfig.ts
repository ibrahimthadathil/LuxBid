import Agenda from 'agenda'

export const agenda=new Agenda({
    db:{address:process.env.MONGO_URL as string}
});


(async () => {
    try {
      await agenda.start();
      console.log('Agenda started successfully.');
    } catch (error) {
      console.error('Error starting Agenda:', error);
    }
  })();



//   (async () => {
//     try {
//       await agenda.start();
//       console.log('Agenda started successfully.');
  
//       process.on('SIGINT', async () => {
//         await agenda.stop();
//         console.log('Agenda stopped gracefully');
//         process.exit(0);
//       });
  
//     } catch (error) {
//       console.error('Error starting Agenda:', error);
//     }
//   })();