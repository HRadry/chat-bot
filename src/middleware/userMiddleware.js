// middleware/userMiddleware.js
const { updateConversationState } = require('../utils/conversationUtils');

const userMiddleware = async (req, res, next) => {
  try {
    const { contact, text, type } = req.processedData;
    
    if (type === 'message') {
      // Apenas atualiza o estado se o passo atual estiver vazio ou definido pelo webhook
      if (!contact.step) {
        // O webhook vai definir o step apropriado
        console.log('Step is empty. Waiting for webhook to define the step.');
      } else {
        console.log('Current conversation step:', contact.step);
        await updateConversationState(contact, text);
      }
      
      // Passa para o controlador de webhook
      return next();
    }

    console.error('Unsupported message type in userMiddleware:', type);
    next();
  } catch (error) {
    console.error('Error in userMiddleware:', error);
    next();
  }
};

module.exports = userMiddleware;
