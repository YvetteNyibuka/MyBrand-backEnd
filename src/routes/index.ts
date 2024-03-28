import express, { Router } from 'express';
import blogRoutes from './blog.routes';
import commentRouter from './comments.routes';
import likeRouter from './like.routes';
import querryRouter from './querry.routes';
import userRouter from '../routes/auth/signup.routes'
import loginRouter from '../routes/auth/login.routes'

const apiRouter: Router = express.Router();

apiRouter.use('/blogs', blogRoutes);
apiRouter.use('/blogs', commentRouter)
apiRouter.use('/blogs', likeRouter);
apiRouter.use('/querries', querryRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/users/login', loginRouter);
export default apiRouter;

