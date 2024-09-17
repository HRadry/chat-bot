import express from 'express';
import dotenv from 'dotenv';
import webhookRoutes from './routes/webhookRoutes';

// Cargar variables de entorno
dotenv.config();

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;

// Middleware para analizar JSON
app.use(express.json());

// Rutas
app.use('/webhook', webhookRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
