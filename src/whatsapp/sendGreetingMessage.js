const sendMessage = require('../utils/messageSender');

const sendGreetingMessage = async (contact) => {
  const { name, phoneNumber } = contact;

  const greetingData = {
    messaging_product: 'whatsapp',
    type: 'image',
    image: {
      link: 'https://github.com/juliuscxlopes/Wpp-Railways/blob/master/src/assets/istockphoto-460743571-1024x1024.jpg?raw=true', // Substitua pelo URL da sua imagem
      caption: `🎉 Olá, ${name}! Seja super bem-vindo ao Ponto Rápido! 🚀 Eu sou a Paty, sua assistente virtual animada e pronta para te ajudar com o que precisar! 😄✨`
    }
  };

  await sendMessage(phoneNumber, greetingData);
  console.log(`Greeting message sent to ${name} at ${phoneNumber}`);
};

module.exports = sendGreetingMessage;
