import express, { Router } from 'express';
import {
    httpLogin,
} from "../../controllers/auth/login.controllers";

const userRoutes: Router = express.Router();

userRoutes.post('/', httpLogin);

export default userRoutes;
