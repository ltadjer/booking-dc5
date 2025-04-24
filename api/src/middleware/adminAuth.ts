import { Context, Next } from "hono";
import prisma from "../lib/prisma";

export const adminAuthMiddleware = async (c: Context, next: Next) => {
  const user = c.get("user");

  if (!user) {
    return c.json(
      {
        error: "Token d'authentification manquant ou invalide.",
      },
      401
    );
  }

  // Vérifier le rôle actuel de l'utilisateur dans la base de données
  const currentUser = await prisma.user.findUnique({
    where: { id: user.userId },
    select: { role: true },
  });

  if (!currentUser || currentUser.role !== "ADMIN") {
    return c.json(
      {
        error:
          "Accès non autorisé. Seuls les administrateurs peuvent effectuer cette action.",
      },
      403
    );
  }

  await next();
};
