// controllers/webhookController.js
const redis = require('../redisClient');
const { createTicket } = require('../millDeskApi/createTicket'); // Importe a função createTicket
const { validateEmail, emailExists } = require('../millDeskApi/validationEmail');
const sendGreetingMessage = require('../whatsapp/sendGreetingMessage');
const { sendEmailMessage , sendInvalidEmailMessage } = require('../whatsapp/sendEmailMessage');
const {sendSupportMessage, sendConfirmationMessage, sendDescriptionMessage} = require('../whatsapp/sendSupportMessage');
//const { sendCNPJMessage,sendInvalidCNPJMessage } = require('../whatsapp/sendCNPJMessage');
//const { validateCNPJ} = require('../utils/validationUtils'); // Verifique o caminho

const SUPPORT_EXPIRATION = 60

const handleWebhook = async (req, res, next) => {
  const { type } = req.processedData;

  if (type === 'message') {
    const { contact, text } = req.processedData;

    console.log('Received message:', { contact, text });

    try {
      switch (contact.step) {
        case '':  // Se o step estiver vazio, inicia a conversa com a saudação
          await sendGreetingMessage(contact);
          await new Promise(resolve => setTimeout(resolve, 1000)); //atraso de 1 segundo para sincornizar mensagens.
          await sendEmailMessage(contact.phoneNumber);
          contact.step = 'awaitEMAIL';  // Define o próximo passo
          console.log('meu step agora é:', contact)
          await redis.set(contact.whatsappId, JSON.stringify(contact), 'EX' ,SUPPORT_EXPIRATION)
          break;

          case 'awaitEMAIL':
            if (validateEmail(text)) {
              console.log('Email is valid:', contact.email);
              // Verifica se o e-mail existe na lista de solicitantes
              const emailRegistered = await emailExists(text);
              if (emailRegistered) {
                console.log('E-mail registrado encontrado na lista.');
                contact.email = text;
                await sendSupportMessage(contact.phoneNumber);
                await sendDescriptionMessage(contact.phoneNumber);
                contact.step = 'awaitSuport';
                await redis.set(contact.whatsappId, JSON.stringify(contact), 'EX', SUPPORT_EXPIRATION);
              } else {
                console.log('E-mail não registrado encontrado na lista.');
                // TODO: Definir lógica para tratamento de clientes com e-mail não cadastrado
                contact.step = 'awaitEMAIL'; // Solicitar novamente o e-mail
              }
            } else {
              console.log('Invalid email:', text);
              await sendInvalidEmailMessage(contact.phoneNumber);
              contact.step = 'awaitEMAIL'; // Solicitar novamente o e-mail
            }
            break;
          case 'awaitSuport':
            contact.description = text;
            console.log ('Descrição do problema', contact.description);
            await sendConfirmationMessage (contact.phoneNumber);
            contact.step = 'completed';
            await createTicket(contact);
            //TODO: Enviar as informações coletadas para a Base de dados
            await redis.del(contact.whatsappId)
        }

    } catch (error) {
      console.error('Error handling webhook:', error);
    }
  } else if (type === 'status') {
    const { id, status } = req.processedData;
    console.log(`Message ID: ${id}, Status: ${status}`);
  }

  res.sendStatus(200);
};

module.exports = { handleWebhook };
