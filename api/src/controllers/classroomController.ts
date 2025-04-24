import { Context } from "hono";
import { z } from "zod";
import { ClassroomService } from "../services/classroomService";

const createClassroomSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  capacity: z
    .number()
    .int()
    .positive("La capacité doit être un nombre positif"),
  equipment: z.array(z.string()),
});

const updateClassroomSchema = createClassroomSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export const getAllClassrooms = async (c: Context) => {
  try {
    const classrooms = await ClassroomService.getAllClassrooms();
    return c.json(classrooms);
  } catch (error) {
    console.error("Erreur lors de la récupération des salles:", error);
    return c.json({ error: "Erreur lors de la récupération des salles" }, 500);
  }
};

export const getClassroomById = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    const classroom = await ClassroomService.getClassroomById(id);

    if (!classroom) {
      return c.json({ error: "Salle non trouvée" }, 404);
    }

    return c.json(classroom);
  } catch (error) {
    console.error("Erreur lors de la récupération de la salle:", error);
    return c.json({ error: "Erreur lors de la récupération de la salle" }, 500);
  }
};

export const createClassroom = async (c: Context) => {
  try {
    const body = await c.req.json();
    const validatedData = createClassroomSchema.parse(body);

    const classroom = await ClassroomService.createClassroom(validatedData);
    return c.json(classroom, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    console.error("Erreur lors de la création de la salle:", error);
    return c.json({ error: "Erreur lors de la création de la salle" }, 500);
  }
};

export const updateClassroom = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();
    const validatedData = updateClassroomSchema.parse(body);

    const classroom = await ClassroomService.updateClassroom(id, validatedData);

    if (!classroom) {
      return c.json({ error: "Salle non trouvée" }, 404);
    }

    return c.json(classroom);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    console.error("Erreur lors de la mise à jour de la salle:", error);
    return c.json({ error: "Erreur lors de la mise à jour de la salle" }, 500);
  }
};

export const deleteClassroom = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    const classroom = await ClassroomService.deleteClassroom(id);

    if (!classroom) {
      return c.json({ error: "Salle non trouvée" }, 404);
    }

    return c.json({ message: "Salle supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la salle:", error);
    return c.json({ error: "Erreur lors de la suppression de la salle" }, 500);
  }
};

export const searchClassrooms = async (c: Context) => {
  try {
    const query = c.req.query("q") || "";
    const classrooms = await ClassroomService.searchClassrooms(query);
    return c.json(classrooms);
  } catch (error) {
    console.error("Erreur lors de la recherche des salles:", error);
    return c.json({ error: "Erreur lors de la recherche des salles" }, 500);
  }
};
