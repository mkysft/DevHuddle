import { Router } from "express";
// Routes
import AuthRoutes from "./AuthRoutes";
import UserRoutes from "./UserRoutes";
import PostRoutes from "./PostRoutes";

const routes = Router();

routes.use("/api/auth", AuthRoutes);
routes.use("/api/user", UserRoutes);
routes.use("/api/post", PostRoutes);

module.exports = routes;
