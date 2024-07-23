// utils/contactUtils.js

/**
 * Valida um CNPJ.
 * @param {string} cnpj - O CNPJ a ser validado.
 * @returns {boolean} - Retorna verdadeiro se o CNPJ for válido, caso contrário, falso.
 */
function validateCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj === '') return false;

  if (cnpj.length !== 14) return false;

  // Elimina CNPJs conhecidos como inválidos
  if (/^(\d)\1+$/.test(cnpj)) return false;

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return false;

  return true;
}

/**
* Valida um e-mail.
* @param {string} email - O e-mail a ser validado.
* @returns {boolean} - Retorna verdadeiro se o e-mail for válido, caso contrário, falso.
*/
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

/**
* Processa a mensagem do contato, validando e atualizando conforme necessário.
* @param {object} contact - O objeto de contato que contém o estado e os dados.
* @param {string} text - O texto da mensagem recebida.
* @returns {Promise<void>}
*/
async function processContactMessage(contact, text) {
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
}

module.exports = {
  validateCNPJ,
  validateEmail,
  processContactMessage
};
