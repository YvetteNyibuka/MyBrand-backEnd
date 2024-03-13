import express, { Express, Request, Response } from 'express';
import apiRouter from './routes/index';

const app: Express = express();

app.use(express.json());

app.use('/api/v1', apiRouter);

app.get('/api/v1', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to my blogs API' });
});

export default app;
