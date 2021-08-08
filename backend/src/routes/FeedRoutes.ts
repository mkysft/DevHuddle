const router = require("express").Router();
import { Authenticate, Authorize } from "../middleware/AuthMiddleware";
import FeedController from "../controllers/FeedController";

router.post("/", Authenticate, Authorize("admin", "developer"), FeedController.getFeed);

export default router;
