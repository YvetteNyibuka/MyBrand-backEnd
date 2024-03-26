import express, { Router } from 'express';
import {isAdmin} from '../middlewares/authorization'

import {
  httpCreateQuerry,
  httpGetQuerries,
  httpGetOneQuerry,
  deletesingleQuerry,
} from "../controllers/querry.controllers";

import isValid from "../middlewares/querryMiddleware";

const querryRoutes: Router = express.Router();

querryRoutes.post('/', isValid,httpCreateQuerry );
querryRoutes.get('/',isAdmin, httpGetQuerries);
querryRoutes.get('/:id', isAdmin, httpGetOneQuerry);
querryRoutes.delete('/:id',isAdmin, deletesingleQuerry);

export default querryRoutes;
