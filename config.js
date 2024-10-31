// config.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://<realgrafok>:<ruthydani300496>@cluster0.mongodb.net/productosprueba?retryWrites=true&w=majority'
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Termina la aplicación en caso de error
  }
};

export default connectDB;