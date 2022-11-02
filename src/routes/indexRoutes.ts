import { Router } from "express";
import aliRoutes from "./aliExpress";

const routes = Router();
routes.use(aliRoutes);

export default routes;
