import mongoose from 'mongoose';

mongoose.connection.on('open', () => {
  console.info('Database connected');
});

mongoose.connection.on('close', () => {
  console.info('something went wrong');
});

export const mongoConnect = () => {
  try {
     mongoose.connect('mongodb+srv://izanyibukayvette:j3kpwvKDtkNQGwRp@cluster0.b83eeem.mongodb.net/mybrand-be');
    console.info('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// export default { mongoConnect };

export const mongoDisconnect = async () => {
  try {
    await mongoose.disconnect();
    console.info('MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};
