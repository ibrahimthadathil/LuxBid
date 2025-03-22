import Agenda from 'agenda'

export  const agendaInstance = new Agenda({
    db:{address:process.env.MONGO_URL as string}
});


(async () => {
    try {
      await agendaInstance.start();
      console.log('Agenda started successfully.');
    } catch (error) {
      console.error('Error starting Agenda:', error);
    }
  })();


