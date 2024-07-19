const express = require('express');
const dotenv = require('dotenv');
const cspMiddleware = require('./middleware/cspMiddleware'); // Sem extensão
const webhookRoutes = require('./routes/webhookRoutes');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para analisar JSON
app.use(express.json());
// Middleware para CSP
app.use(cspMiddleware);

// Rotas
app.use('/webhook', webhookRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
