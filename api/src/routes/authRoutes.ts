import { Hono } from "hono";
import { signUp, signIn, signOut } from "../controllers/authController";

const authRouter = new Hono();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", signOut);

export default authRouter;
