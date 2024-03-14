
import app from './app';
import { mongoConnect } from './services/mongoConnection';

const startServer = async () => {
  await mongoConnect();

  app.listen(8080, () => {
    console.log('Server is listening on port 8080');
  });
};

startServer();
