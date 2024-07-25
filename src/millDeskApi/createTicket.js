const axios = require('axios');
require('dotenv').config();

const createTicket = async (contact) => {
  const apiKey = process.env.MILLDESK_API_KEY;
  const title = contact.title;
  const email = contact.email;
  const description = contact.description;
  const additionalInfo = `%0A%0AInformações do Contato:%0A` +
                         `Chamado aberto por: ${contact.name}%0A` +
                         `Telefone da Abertura: ${contact.phoneNumber}%0A` +
                         `Local: ${contact.location}%0A` +
                         `Responsável: ${contact.responsavel}%0A` +
                         `Contato Responsável: ${contact.contato_responsavel}`;

  const fullDescription = `${description}${additionalInfo}`;
  
  const url = `https://v1.milldesk.com/api/${apiKey}/addTicket?email=${email}&title=${title}&description=${fullDescription}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
    console.log(url);
  } catch (error) {
    console.error('Erro ao criar ticket na MillDesk:', error);
  }
};

module.exports = {
  createTicket,
};
