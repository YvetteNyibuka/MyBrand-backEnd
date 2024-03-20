import express, { Router } from 'express';
import {isAdmin} from '../../middlewares/authorization'

import {
    httpCreateUser,
    httpGetUsers,
    httpGetOneUser,
    httpUpdateOneUser,
    deletesingleUser,
} from "../../controllers/auth/user.controllers";
import isValid from "../../middlewares/auth/userMiddleware";

const userRoutes: Router = express.Router();

userRoutes.post('/', httpCreateUser);
userRoutes.get('/', isAdmin,httpGetUsers);
userRoutes.get('/:id', httpGetOneUser);
userRoutes.patch('/:id',httpUpdateOneUser);
userRoutes.delete('/:id', isAdmin, deletesingleUser);

export default userRoutes;
