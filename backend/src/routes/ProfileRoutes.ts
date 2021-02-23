const router = require("express").Router();
import { Authenticate, Authorize } from "../middleware/AuthMiddleware";
import ProfileController from "../controllers/ProfileController";

router.get("/", Authenticate, Authorize("admin"), ProfileController.getAllProfiles);
router.get("/:id", Authenticate, Authorize("admin", "editor"), ProfileController.getProfileByID);
router.put("/:id", Authenticate, Authorize("admin", "editor"), ProfileController.updateProfileByID);
router.delete("/:id", Authenticate, Authorize("admin"), ProfileController.deleteProfileByID);

export default router;
