const mongoose = require('mongoose');

mongoose.connection.on('open', () => {
  console.info('Database connected');
});

mongoose.connection.on('close', () => {
  console.info('something went wrong');
});

const mongoConnect = async () => {
  await mongoose.connect('mongodb+srv://izanyibukayvette:j3kpwvKDtkNQGwRp@cluster0.b83eeem.mongodb.net/');
};
const mongoDisconnect = async () => {
  await mongoose.disconnect();
};

module.exports = {
  mongoConnect,
  mongoDisconnect,
};