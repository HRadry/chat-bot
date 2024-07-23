// controllers/ontroller.js
const { validateCNPJ, validateEmail } = require('../utils/validationUtils');

/**
 * Processa a mensagem do contato, validando e atualizando conforme necessário.
 * @param {object} contact - O objeto de contato que contém o estado e os dados.
 * @param {string} text - O texto da mensagem recebida.
 * @returns {Promise<void>}
 */
const processContactMessage = async (contact, text) => {
  if (contact.step === 'awaitCNPJ') {
    if (validateCNPJ(text)) {
      contact.cnpj = text;
      console.log('CNPJ is valid:', contact.cnpj);
      contact.step = 'getEmail'; // Avança para o próximo passo
    } else {
      console.log('Invalid CNPJ:', text);
      // Enviar mensagem de erro ou instruções adicionais se necessário
    }
  } else if (contact.step === 'awaitEMAIL') {
    if (validateEmail(text)) {
      contact.email = text;
      console.log('Email is valid:', contact.email);
      contact.step = 'completed'; // Marca a conversa como completa
    } else {
      console.log('Invalid email:', text);
      // Enviar mensagem de erro ou instruções adicionais se necessário
    }
  }
};

module.exports = { processContactMessage };
