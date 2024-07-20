webhook-serve-Railway
│
├── src/
│   ├── app.js
│   ├── controllers/
│   │   ├── webhookController.js
│   │   └── verificationController.js
│   ├── middleware/
│   │   └── webhookLogger.js
│   ├── routes/
│   │   └── webhookRoutes.js
│   ├── utils/
│   │   └── phoneUtils.js
│   │   └──messageSender.js
│   └── Whatsapp/
│       └──sendExitMessage.js
│       └──sendGreetingMessage.js
│       └──sendMenuPrincipal.js
│       └──sendSalesMessage.js
│       └──sendSupportMessage.js
├── .gitignore
├── .env
├── package.json