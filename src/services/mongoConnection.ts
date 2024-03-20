import mongoose from 'mongoose';

mongoose.connection.on('open', () => {
  console.info('MongoDB connected');
});

mongoose.connection.on('close', () => {
  console.info('MongoDB connection closed');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});


export const connectToMongoDB = async (databaseURI: string) => {
  try {
    await mongoose.connect(databaseURI);
    console.info('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export const disconnectFromMongoDB = async () => {
  try {
    await mongoose.disconnect();
    console.info('MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};

// For development environment
const devDatabaseURI = process.env.DEV_DATABASE_URL as string;
export const connectToDevelopmentDB = async () => {
  await connectToMongoDB(devDatabaseURI);
};

// For testing environment
const testURI = process.env.TESTDATABASE_URL as string;
export const connectToTestDB = async () => {
  await connectToMongoDB(testURI);
};
