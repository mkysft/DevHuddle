import { Router } from "express";
// Routes
import AuthRoutes from "./AuthRoutes";
import UserRoutes from "./UserRoutes";

const routes = Router();

routes.use("/api/auth", AuthRoutes);
routes.use("/api/user", UserRoutes);

module.exports = routes;
