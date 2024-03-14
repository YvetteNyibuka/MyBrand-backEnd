import express, { Router } from 'express';
import {
  httpCreateQuerry,
  httpGetQuerries,
  httpGetOneQuerry,
  deletesingleQuerry,
} from "../controllers/querry.controllers";

import isValid from "../middlewares/querryMiddleware";

const querryRoutes: Router = express.Router();

querryRoutes.post('/', isValid,httpCreateQuerry );
querryRoutes.get('/', httpGetQuerries);
querryRoutes.get('/:id', httpGetOneQuerry);
querryRoutes.delete('/:id', deletesingleQuerry);

export default querryRoutes;
