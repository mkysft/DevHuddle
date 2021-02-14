const router = require("express").Router();
import { Authenticate, Authorize } from "../middleware/AuthMiddleware";
import UserController from "../controllers/UserController";

router.get("/", Authenticate, Authorize("admin"), UserController.getAllUsers);
router.get("/me", Authenticate, UserController.getCurrentUser);
router.get("/:id", Authenticate, Authorize("admin", "editor"), UserController.getUserByID);

export default router;
