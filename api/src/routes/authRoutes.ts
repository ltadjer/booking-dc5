import { Hono } from "hono";
import { signUp, signIn } from "../controllers/authController";

const authRouter = new Hono();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);

export default authRouter;
