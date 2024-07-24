const axios = require('axios');
require('dotenv').config();


const createTicket = async (contact) => {
  const { description: issueDescription } = contact;
  const apiKey = process.env.MILLDESK_API_KEY;
  const title = ('WhatsApp');
  const email = (process.env.EMAIL_MILLDESK);
  const description = (issueDescription);

  const url = `https://v1.milldesk.com/api/${apiKey}/addTicket?email=${email}&title=:${title}&description=${description}`;

  try {
    const response = await axios.get(url);
    console.log('Ticket criado na MillDesk:', response.data);
    console.log(email, url)
  } catch (error) {
    console.error('Erro ao criar ticket na MillDesk:', error);
  }
};

module.exports = {
  createTicket,
};