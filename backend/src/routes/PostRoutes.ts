const router = require("express").Router();
import { Authenticate, Authorize } from "../middleware/AuthMiddleware";
import PostController from "../controllers/PostController";

router.get("/", Authenticate, Authorize("admin", "editor"), PostController.getAllPosts);
router.post("/", Authenticate, Authorize("admin", "editor"), PostController.createPost);
router.get("/feed", Authenticate, Authorize("admin", "editor"), PostController.getPostFeed);
router.get("/:id", Authenticate, Authorize("admin", "editor"), PostController.getPostByID);
router.put("/:id", Authenticate, Authorize("admin", "editor"), PostController.updatePostByID);
router.delete("/:id", Authenticate, Authorize("admin", "editor"), PostController.deletePostByID);
router.get("/me", Authenticate, PostController.getCurrentUserPosts);

export default router;
