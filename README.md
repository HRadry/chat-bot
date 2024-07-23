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