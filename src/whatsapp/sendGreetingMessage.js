const sendMessage = require('../utils/messageSender');

const sendGreetingMessage = async (phoneNumber) => {
  const greetingData = {
    type: 'image',
    image: {
      link: 'https://example.com/welcome-image.jpg', // Substitua pelo URL da sua imagem
      caption: 'Olá, Seja bem-vindo ao Ponto Rápido! Sou sua assistente virtual, Kellynguiça. Estou aqui para te ajudar.'
    }
  };

  await sendMessage(phoneNumber, greetingData);
};

module.exports = sendGreetingMessage;
