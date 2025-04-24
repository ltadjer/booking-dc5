import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { adminAuthMiddleware } from "../middleware/adminAuth";
import {
  getAllClassrooms,
  getClassroomById,
  createClassroom,
  updateClassroom,
  deleteClassroom,
  searchClassrooms,
} from "../controllers/classroomController";

const classroomRouter = new Hono();

// Routes publiques
classroomRouter.get("/", getAllClassrooms);
classroomRouter.get("/search", searchClassrooms);
classroomRouter.get("/:id", getClassroomById);

// Routes nécessitant une authentification simple
classroomRouter.use("*", authMiddleware);

// Routes nécessitant des droits d'administrateur
classroomRouter.use("/", adminAuthMiddleware);
classroomRouter.post("/", createClassroom);
classroomRouter.delete("/:id", deleteClassroom);

// Routes accessibles aux utilisateurs authentifiés
classroomRouter.put("/:id", updateClassroom);

export default classroomRouter;
