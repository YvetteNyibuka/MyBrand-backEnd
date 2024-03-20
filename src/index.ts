
import app from './app';
import { connectToDevelopmentDB } from './services/mongoConnection';

const startServer = async () => {
  await connectToDevelopmentDB();

  app.listen(8080, () => {
    console.log('Server is listening on port 8080');
  });
};

startServer();
