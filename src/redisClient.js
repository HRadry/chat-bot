// redisClient.js
const Redis = require('ioredis');

// Conectar ao Redis usando a URL fornecida pelas variáveis de ambiente
const redis = new Redis(process.env.REDIS_URL);

module.exports = redis;

