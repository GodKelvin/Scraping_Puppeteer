import { Router } from "express";
import * as ctrl from '../controllers/aliExpress';

const aliRoutes = Router();
aliRoutes.get('/ali', ctrl.getAli);
export default aliRoutes;

