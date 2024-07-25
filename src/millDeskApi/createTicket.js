const axios = require('axios');
require('dotenv').config();

const createTicket = async (contact) => {
  const apiKey = process.env.MILLDESK_API_KEY;
  const title = contact.title;
  const email = contact.email;
  const description = 'Descrição: ${contact.description}\n' + 
                      'Informações do Contato:\n' + 
                      'Nome: ${contact.name}\n' + 
                      'Número de Telefone: ${contact.phoneNumber}\n' + 
                      'local: ${contact.location}\n' + 
                      'Responsável: ${contact.responsavel}\n' +
                      'Contato Responsável: ${contact.contato_responsavel}';
  
  const url = `https://v1.milldesk.com/api/${apiKey}/addTicket?email=${email}&title=${title}&description=${encodeURIComponent(description)}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
    console.log(url);
  } catch (error) {
    console.error('Erro ao criar ticket na MillDesk:', error);
  }
};

module.exports = { createTicket };
