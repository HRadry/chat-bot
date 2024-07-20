const sendMessage = require('../utils/messageSender');
//const { formatPhoneNumber } = require('../utils/phoneUtils'); // Importe a função de formatação


const sendMenuPrincipal = async (phoneNumber) => {
    // Formate o número de telefone
    //const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

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
  console.log(`Menu principal enviado para ${formattedPhoneNumber}`);
};

module.exports = sendMenuPrincipal;
