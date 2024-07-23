const axios = require('axios');
require('dotenv').config();


const createTicket = async (contact) => {
  const { issueDescription } = contact;
  const apiKey = process.env.MILLDESK_API_KEY;
  const title = 'Solicitação de Suporte via WhatsApp';
  const email = process.env.EMAIL_MILLDESK;

  const url = `https://v1.milldesk.com/api/${apiKey}/addTicket?email=${email}&title=${title}&description=${issueDescription}`;

  try {
    const response = await axios.get(url);
    console.log('Ticket criado na MillDesk:', response.data);
    console.log(email)
  } catch (error) {
    console.error('Erro ao criar ticket na MillDesk:', error);
  }
};

module.exports = {
  createTicket,
};