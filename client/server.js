import dotenv from 'dotenv';
import app from './app.js';
import connectToDatabase from './config/database.js';
import * as productService from './services/productService.js'; // Import productService

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectToDatabase(); // Connect to the database
    await productService.initializeDatabase(); // Initialize the database with API data
    console.log('Database initialized successfully'); // Confirm initialization

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error during server startup:', error.message);
    process.exit(1); // Exit if there’s an error
  }
};

startServer();












