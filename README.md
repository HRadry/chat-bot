webhook-serve-Railway
│
├── src/
│   ├── app.js
│   ├── assets
│   │   ├── istockphoto-460743571-1024x1024.jpg
│   ├── controllers/
│   │   ├── webhookController.js
│   │   └── verificationController.js
│   ├── middleware/
│   │   └── messageProcessor.js
│   │   └── statusProcessor.js
│   ├── routes/
│   │   └── webhookRoutes.js
│   ├── utils/
│   │   └── phoneUtils.js
│   │   └──messageSender.js
│   │   └── processWebhookData.js
│   └── Whatsapp/
│       └──sendExitMessage.js
│       └──sendGreetingMessage.js
│       └──sendMenuPrincipal.js
│       └──sendSalesMessage.js
│       └──sendSupportMessage.js
│       └──sendCNPJMessage
│       └──sendEmailMessage
├── .gitignore
├── .env
├── package.json