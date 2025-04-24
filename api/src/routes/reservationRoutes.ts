import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import {
  createReservation,
  getMyReservations,
  getClassroomReservations,
  getReservationById,
  deleteReservation,
} from "../controllers/reservationController";
import { createReservationSchema } from "../schemas/reservationSchema";
import { zValidator } from "@hono/zod-validator";

const reservationRoutes = new Hono();

// Appliquer le middleware d'authentification à toutes les routes
reservationRoutes.use("*", authMiddleware);

// Routes
reservationRoutes.post(
  "/",
  zValidator("json", createReservationSchema),
  createReservation
);
reservationRoutes.get("/me", getMyReservations);
reservationRoutes.get("/classroom/:classroomId", getClassroomReservations);
reservationRoutes.get("/:id", getReservationById);
reservationRoutes.delete("/:id", deleteReservation);

export default reservationRoutes;
