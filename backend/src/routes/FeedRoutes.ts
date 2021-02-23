const router = require("express").Router();
import { Authenticate, Authorize } from "../middleware/AuthMiddleware";
import FeedController from "../controllers/FeedController";

router.post("/", Authenticate, Authorize("admin", "editor"), FeedController.getTagFeed);
router.post("/today", Authenticate, Authorize("admin", "editor"), FeedController.getTodaysFeed);

export default router;
