const sendMessage = require('../utils/messageSender');

// Mensagem de Suporte
const sendSupportMessage = async (phoneNumber) => {
  const messageData = { 
    messaging_product: 'whatsapp',
    type: 'text',
    text: {
      body: `💔 Poxa, que chato que você está enfrentando problemas... 😟 Mas não se preocupe! Vou abrir um chamado para você e te conectar com um especialista. 🛠️✨ Um momento, por favor! 😉`
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Support message sent to ${phoneNumber}`);
};

// Mensagem de Descrição
const sendDescriptionMessage = async (phoneNumber) => {
  const messageData = { 
    messaging_product: 'whatsapp',
    type: 'text',
    text: {
      body: `✍️ Agora, para que possamos resolver tudo direitinho, descreva seu problema de forma rápida e direta para anexarmos ao seu chamado. 🔍 Se precisar de ajuda, estou por aqui! 😄`
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Description message sent to ${phoneNumber}`);
};

// Mensagem de Confirmação
const sendConfirmationMessage = async (phoneNumber) => {
  const messageData = { 
    messaging_product: 'whatsapp',
    type: 'text',
    text: {
      body: `✔️ Perfeito! Recebi sua descrição. 🎯 Nossa equipe vai analisar e entrar em contato com você o mais breve possível. Se tiver mais alguma dúvida ou precisar de mais alguma coisa, é só chamar. Estou aqui para ajudar! 😃✨`
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Confirmation message sent to ${phoneNumber}`);
};

module.exports = { sendSupportMessage, sendDescriptionMessage, sendConfirmationMessage };
