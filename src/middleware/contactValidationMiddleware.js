// middleware/contactValidationMiddleware.js
const { validateCNPJ, validateEmail } = require('../utils/validationUtils');

const contactValidationMiddleware = (req, res, next) => {
  const { normalizedText, contact } = req.processedData;

  if (contact.step === 'getCNPJ') {
    req.isValidCNPJ = validateCNPJ(normalizedText);
  } else if (contact.step === 'getEmail') {
    req.isValidEmail = validateEmail(normalizedText);
  }

  next();
};

module.exports = contactValidationMiddleware;
