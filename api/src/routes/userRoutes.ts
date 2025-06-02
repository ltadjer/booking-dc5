import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  getAllUsers,
  getUserById,
  createUser,
  getCurrentUser,
} from "../controllers/userController";
import {createUserSchema, updateUserSchema} from "../schemas/userSchema";
import { authMiddleware } from "../middleware/auth";
import {updateUser} from "../controllers/userController";

const userRouter = new Hono();

// Routes protégées par authentification
userRouter.use("*", authMiddleware);

userRouter.get("/", getAllUsers);
userRouter.get("/me", getCurrentUser);
userRouter.get("/:id", getUserById);
userRouter.post("/", zValidator("json", createUserSchema), createUser);
userRouter.put("/update", zValidator("json", updateUserSchema), updateUser);
export default userRouter;
