import express, { Router } from 'express';
import blogRoutes from './blog.routes';
import commentRouter from './comments.routes';
import likeRouter from './like.routes';
import querryRouter from './querry.routes';
import userRouter from '../routes/auth/signup.routes'

const apiRouter: Router = express.Router();

apiRouter.use('/blog', blogRoutes);
apiRouter.use('/blog', commentRouter)
apiRouter.use('/blog', likeRouter);
apiRouter.use('/querries', querryRouter);
apiRouter.use('/auth/register', userRouter);

export default apiRouter;

