import express, { Router } from 'express';
import {
    httpCreateUser,
    httpGetUsers,
    httpGetOneUser,
    httpUpdateOneUser,
    deletesingleUser,
} from "../../controllers/auth/user.controllers";
import isValid from "../../middlewares/auth/userMiddleware";

const userRoutes: Router = express.Router();

userRoutes.post('/',isValid, httpCreateUser);
userRoutes.get('/', httpGetUsers);
userRoutes.get('/:id', httpGetOneUser);
userRoutes.patch('/:id', httpUpdateOneUser);
userRoutes.delete('/:id', deletesingleUser);

export default userRoutes;
