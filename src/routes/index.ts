import express, { Router } from 'express';
import blogRoutes from './blog.routes';

const apiRouter: Router = express.Router();

apiRouter.use('/blog', blogRoutes);

export default apiRouter;

