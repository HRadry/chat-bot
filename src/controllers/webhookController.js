const sendGreetingMessage = require('../whatsapp/greetingMessage');
const sendSupportMessage = require('../whatsapp/sendSupportMessage');
//const sendSalesMessage = require('../whatsapp/sendSalesMessage'); // Suponha que você criará funções similares para Vendas
//const sendAppointmentsMessage = require('../whatsapp/sendAppointmentsMessage'); // Suponha que você criará funções similares para Agendamentos

const handleWebhook = async (req, res) => {
  try {
    const { phoneNumber, text } = req.processedData;

    if (text) {
      const normalizedText = text.toLowerCase().trim();
      
      if (normalizedText === 'Suporte') {
        // Enviar mensagem de suporte
        await sendSupportMessage(phoneNumber);
      } else if (normalizedText === 'Vendas') {
        // Enviar mensagem de vendas
        await sendSalesMessage(phoneNumber);
      } else if (normalizedText === 'Agendamentos') {
        // Enviar mensagem de agendamentos
        await sendAppointmentsMessage(phoneNumber);
      } else if (normalizedText === 'Sair') {
        // Lógica para quando o usuário escolher "Sair" (opcional)
      } else if (normalizedText === ' Olá') {
        // Enviar mensagem de saudação
        await sendGreetingMessage(phoneNumber);

        // Enviar menu principal após a saudação
        await sendMenuPrincipal(phoneNumber);
      } else {
        // Caso o texto não corresponda a nenhum dos casos
        console.log('Texto não reconhecido:', text);
      }
    } else {
      // Se o texto estiver vazio, você pode tratar como uma situação especial, se necessário
      console.log('Nenhum texto recebido.');
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao processar o webhook:', error);
    res.sendStatus(500); // Internal Server Error
  }
};

module.exports = { handleWebhook };
