import prisma from "../lib/prisma";
import { CreateReservationServiceInput } from "../schemas/reservationSchema";

export class ReservationService {
  static async createReservation(data: CreateReservationServiceInput) {
    // Vérifier si la salle existe et est active
    const classroom = await prisma.classroom.findUnique({
      where: { id: data.classroomId },
    });

    if (!classroom) {
      throw new Error("Salle non trouvée");
    }

    if (!classroom.isActive) {
      throw new Error("Cette salle n'est pas disponible");
    }

    // Vérifier si la salle est disponible pour la période demandée
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        classroomId: data.classroomId,
        OR: [
          {
            AND: [
              { startTime: { lte: data.startTime } },
              { endTime: { gt: data.startTime } },
            ],
          },
          {
            AND: [
              { startTime: { lt: data.endTime } },
              { endTime: { gte: data.endTime } },
            ],
          },
        ],
      },
    });

    if (existingReservation) {
      throw new Error("La salle est déjà réservée pour cette période");
    }

    // Créer la réservation
    return prisma.reservation.create({
      data: {
        startTime: data.startTime,
        endTime: data.endTime,
        userId: data.userId,
        classroomId: data.classroomId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        classroom: true,
      },
    });
  }

  static async getReservationsByUser(userId: number) {
    return prisma.reservation.findMany({
      where: { userId },
      include: {
        classroom: true,
      },
      orderBy: {
        startTime: "desc",
      },
    });
  }

  static async getReservationsByClassroom(classroomId: number) {
    return prisma.reservation.findMany({
      where: { classroomId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        startTime: "desc",
      },
    });
  }

  static async getReservationById(id: number) {
    return prisma.reservation.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        classroom: true,
      },
    });
  }

  static async deleteReservation(id: number, userId: number) {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      throw new Error("Réservation non trouvée");
    }

    // Vérifier si l'utilisateur est autorisé à supprimer la réservation
    if (reservation.userId !== userId) {
      throw new Error("Non autorisé à supprimer cette réservation");
    }

    return prisma.reservation.delete({
      where: { id },
    });
  }
}
