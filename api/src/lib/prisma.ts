import { PrismaClient } from "@prisma/client";

// Créer une instance globale du client Prisma
const prisma = new PrismaClient();

export default prisma;
