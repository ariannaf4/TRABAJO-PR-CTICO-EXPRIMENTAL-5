const mongoose = require('mongoose');

// Configuración de MongoDB
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

// Inicializar MongoDB
connectMongoDB();

module.exports = { mongoose };
