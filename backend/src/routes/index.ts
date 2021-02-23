import { Router } from "express";
// Routes
import AuthRoutes from "./AuthRoutes";
import UserRoutes from "./UserRoutes";
import ProfileRoutes from "./ProfileRoutes";
import PostRoutes from "./PostRoutes";
import FeedRoutes from "./FeedRoutes";

const routes = Router();

routes.use("/api/auth", AuthRoutes);
routes.use("/api/user", UserRoutes);
routes.use("/api/profile", ProfileRoutes);
routes.use("/api/post", PostRoutes);
routes.use("/api/feed", FeedRoutes);

module.exports = routes;
