import express, { Router } from 'express';
import blogRoutes from './blog.routes';
import commentRouter from './comments.routes';
import likeRouter from './like.routes';

const apiRouter: Router = express.Router();

apiRouter.use('/blog', blogRoutes);
apiRouter.use('/blog', commentRouter)
apiRouter.use('/blog', likeRouter);

export default apiRouter;

