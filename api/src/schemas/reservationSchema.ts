import { z } from "zod";

export const createReservationSchema = z.object({
  startTime: z.string().transform((str) => new Date(str)),
  endTime: z.string().transform((str) => new Date(str)),
  classroomId: z.number().int().positive(),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;

// Type étendu pour le service qui inclut userId
export type CreateReservationServiceInput = CreateReservationInput & {
  userId: number;
};
