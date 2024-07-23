// middleware/contactValidationMiddleware.js
const { validateCNPJ, validateEmail } = require('../utils/validationUtils');

const contactValidationMiddleware = (req, res, next) => {
  const { normalizedText, contact } = req.processedData;

  if (contact.step === 'getCNPJ') {
    if (validateCNPJ(normalizedText)) {
      contact.cnpj = normalizedText;
      req.isValidCNPJ = true;
    } else {
      req.isValidCNPJ = false;
    }
  } else if (contact.step === 'getEmail') {
    if (validateEmail(normalizedText)) {
      contact.email = normalizedText;
      req.isValidEmail = true;
    } else {
      req.isValidEmail = false;
    }
  }

  next();
};

module.exports = contactValidationMiddleware;
