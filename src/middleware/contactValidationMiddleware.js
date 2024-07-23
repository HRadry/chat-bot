// middleware/contactValidationMiddleware.js
const { validateCNPJ, validateEmail } = require('../utils/validationUtils');

const contactValidationMiddleware = (req, res, next) => {
  const { normalizedText, contact } = req.processedData;

  if (contact.step === 'getCNPJ') {
    if (validateCNPJ(normalizedText)) {
      contact.cnpj = normalizedText;
      req.isValidCNPJ = true;
      console.log('CNPJ is valid:', contact.cnpj);
    } else {
      req.isValidCNPJ = false;
      console.log('Invalid CNPJ:', normalizedText);
    }
  } else if (contact.step === 'getEmail') {
    if (validateEmail(normalizedText)) {
      contact.email = normalizedText;
      req.isValidEmail = true;
      console.log('Email is valid:', contact.email);
    } else {
      req.isValidEmail = false;
      console.log('Invalid email:', normalizedText);
    }
  }

  next();
};

module.exports = contactValidationMiddleware;
