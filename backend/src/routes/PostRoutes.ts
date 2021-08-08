const router = require("express").Router();
import { Authenticate, Authorize } from "../middleware/AuthMiddleware";
import PostController from "../controllers/PostController";

router.get("/", Authenticate, Authorize("admin", "developer"), PostController.getAllPosts);
router.post("/", Authenticate, Authorize("admin", "developer"), PostController.createPost);
router.get("/feed", Authenticate, Authorize("admin", "developer"), PostController.getPostFeed);
router.get("/:id", Authenticate, Authorize("admin", "developer"), PostController.getPostByID);
router.put("/:id", Authenticate, Authorize("admin", "developer"), PostController.updatePostByID);
router.delete("/:id", Authenticate, Authorize("admin", "developer"), PostController.deletePostByID);
router.get("/me", Authenticate, PostController.getCurrentUserPosts);

export default router;
