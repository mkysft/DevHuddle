const router = require("express").Router();
import { Authenticate, Authorize } from "../middleware/AuthMiddleware";
import UserController from "../controllers/UserController";

router.get("/", Authenticate, Authorize("admin"), UserController.getAllUsers);
router.get("/:id", Authenticate, Authorize("admin", "developer"), UserController.getUserByID);
router.put("/:id", Authenticate, Authorize("admin"), UserController.updateUserByID);
router.delete("/:id", Authenticate, Authorize("admin"), UserController.deleteUserByID);
router.post("/activate/:id", Authenticate, Authorize("admin"), UserController.activateUser);
router.post("/deactivate/:id", Authenticate, Authorize("admin"), UserController.deactivateUser);

export default router;
