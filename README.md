webhook-serve-Railway
│
├── src/
│   ├── app.js
│   ├── assets
│   │   ├── istockphoto-460743571-1024x1024.jpg
│   ├── controllers/
│   │   ├──supportController.js
│   │   ├── webhookController.js
│   │   └── verificationController.js
│   ├── middleware/
│   │   ├── contactValidationMiddleware.js
│   │   ├── messageProcessor.js
│   │   ├── statusProcessor.js
│   │   ├── mildeskMiddleware.js
│   ├── routes/
│   │   └── webhookRoutes.js
│   ├── utils/
│   │   └── phoneUtils.js
│   │   └──messageSender.js
│   │   └── processWebhookData.js
│   │   ├── ValidantionUtils.js
│   └── Whatsapp/
│   │   ├──sendExitMessage.js
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