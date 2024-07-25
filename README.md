webhook-serve-Railway
│
├── src/
│   ├── app.js
│   ├── redisClient.js
│   ├── assets
│   │   ├── istockphoto-460743571-1024x1024.jpg
│   ├── controllers/
│   │   ├── webhookController.js
│   │   └── verificationController.js
│   ├── middleware/
│   │   ├── messageProcessor.js
│   │   ├── statusProcessor.js
│   ├── millDeskApi
│   │   └──createTicket.js
│   ├── routes/
│   │   └── webhookRoutes.js
│   ├── utils/
│   │   └── phoneUtils.js
│   │   └──messageSender.js
│   │   └── processWebhookData.js
│   │   ├── ValidantionUtils.js
│   └── Whatsapp/
│   │   ├──sendExitMessage.js
│   │   ├──sedConfirmationMessage.js
│   │   ├──sendDescripitionMessage.js
│   │   ├──sendGreetingMessage.js
│   │   ├──sendMenuPrincipal.js
│   │   ├──sendSalesMessage.js
│   │   ├──sendSupportMessage.js
│   │   ├──sendCNPJMessage
│   │   ├──sendEmailMessage
│   │   ├──
├── .gitignore
├── .env
├── package.json






        case 'awaitCNPJ':
          if (validateCNPJ(text)) {
            contact.cnpj = text;
            console.log('CNPJ is valid:', contact.cnpj);
            await sendSupportMessage (contact.phoneNumber);
            await sendDescriptionMessage (contact.phoneNumber);
            contact.step = 'awaitSuport';
            await redis.set(contact.whatsappId, JSON.stringify(contact),'EX', SUPPORT_EXPIRATION);
          } else {
            console.log('Invalid CNPJ:', text);
            await sendInvalidCNPJMessage(contact.phoneNumber);
            contact.step = 'awaitCNPJ';
          }
          break;



