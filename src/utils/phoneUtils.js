// src/utils/phoneUtils.js

/**
 * Formata o número de telefone adicionando um '9' quando necessário.
 * @param {string} phoneNumber - Número de telefone no formato incorreto.
 * @returns {string} - Número de telefone formatado corretamente.
 */
function formatPhoneNumber(phoneNumber) {
    // Remove todos os caracteres não numéricos
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Verifica se o número já contém 13 dígitos (incluindo o DDD)
    if (phoneNumber.length === 13) {
        return phoneNumber;
    }

    // Adiciona o '9' se o número estiver faltando
    if (phoneNumber.length === 11) {
        return phoneNumber.slice(0, 2) + '9' + phoneNumber.slice(2);
    }

    // Retorna o número formatado corretamente se não se encaixar em nenhuma das condições acima
    return phoneNumber;
}

module.exports = { formatPhoneNumber };
