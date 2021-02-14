const router = require("express").Router();
import AuthController from "../controllers/AuthController";

router.post("/register", AuthController.RegisterUser);
router.post("/login", AuthController.AuthenticateUser);
router.post("/reset", AuthController.AuthenticateUser);

export default router;
