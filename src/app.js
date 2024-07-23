const express = require('express');
const dotenv = require('dotenv');
const webhookRoutes = require('./routes/webhookRoutes');
const redis = require('./redisClient');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para analisar JSON
app.use(express.json());

// Rotas
app.use('/webhook', webhookRoutes);

const WHATSAPP_ID = '553191496778'
app.get('/clear', async () => {
    const contact = JSON.parse ( await redis.get(WHATSAPP_ID))
    if (contact) {
        console.log('foi encontrado objeto tal', contact)
        redis.del(WHATSAPP_ID)
    }
    else {
        console.log('nao foi encontrado o registro')
    }


})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
