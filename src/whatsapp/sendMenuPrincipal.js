const sendMessage = require('../utils/messageSender');

const sendMenuPrincipal = async (phoneNumber) => {
  const menuData = {
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
              id: 'appointments',
              title: 'Agendamentos'
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
