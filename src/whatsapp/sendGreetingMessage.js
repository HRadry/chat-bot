const sendMessage = require('../utils/messageSender');
//const { formatPhoneNumber } = require('../utils/phoneUtils'); // Importe a função de formatação

const sendGreetingMessage = async (phoneNumber) => {
  // Formate o número de telefone
  //const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

  const greetingData = {
    messaging_product: 'whatsapp',
    type: 'image',
    image: {
      link: 'https://github.com/juliuscxlopes/Wpp-Railways/blob/master/src/assets/istockphoto-460743571-1024x1024.jpg?raw=true', // Substitua pelo URL da sua imagem
      caption: 'Olá, Seja bem-vindo ao Ponto Rápido! Sou sua assistente virtual, Kellynguiça. Estou aqui para te ajudar.'
    }
  };

  await sendMessage(phoneNumber, greetingData);
  console.log(`Greeting message sent to ${phoneNumber}`);
};

module.exports = sendGreetingMessage;
