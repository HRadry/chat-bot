const sendMessage = require('../utils/messageSender');
const { formatPhoneNumber } = require('../utils/phoneUtils'); // Importe a função de formatação

const sendGreetingMessage = async (phoneNumber) => {
  // Formate o número de telefone
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

  const greetingData = {
    type: 'image',
    image: {
      link: 'https://example.com/welcome-image.jpg', // Substitua pelo URL da sua imagem
      caption: 'Olá, Seja bem-vindo ao Ponto Rápido! Sou sua assistente virtual, Kellynguiça. Estou aqui para te ajudar.'
    }
  };

  await sendMessage(formattedPhoneNumber, greetingData);
};

module.exports = sendGreetingMessage;
