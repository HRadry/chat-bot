// src/utils/phoneUtils.js
function formatPhoneNumber(phoneNumber) {
    // Adiciona o dígito '9' após o código de área '31'
    if (phoneNumber.startsWith('5531') && phoneNumber.length === 12) {
        const formatted = phoneNumber.slice(0, 4) + '9' + phoneNumber.slice(4);
        console.log(`Número original: ${phoneNumber}, Número formatado: ${formatted}`);
        return formatted;
    }
    console.log(`Número original: ${phoneNumber}, Número formatado: ${phoneNumber}`);
    return phoneNumber;
}

module.exports = { formatPhoneNumber };
