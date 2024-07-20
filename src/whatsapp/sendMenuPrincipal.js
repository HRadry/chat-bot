const sendMessage = require('../utils/messageSender');

const sendMenuPrincipal = async (phoneNumber) => {
  const menuData = {
    messaging_product: 'whatsapp', // Adicione o parâmetro messaging_product
    to: phoneNumber, // Adicione o número de telefone como parâmetro
    type: 'interactive',
    interactive: {
      type: 'button',
      body: {
        text: 'Selecione uma opção abaixo para que possamos melhor atendê-lo.'
      },
      action: {
        buttons: [
          {
            type: 'reply',
            reply: {
              id: 'sales',
              title: 'Vendas'
            }
          },
          {
            type: 'reply',
            reply: {
              id: 'support',
              title: 'Suporte'
            }
          },
          {
            type: 'reply',
            reply: {
              id: 'exit',
              title: 'Sair'
            }
          }
        ]
      }
    }
  };

  await sendMessage(phoneNumber, menuData);
};

module.exports = sendMenuPrincipal;
