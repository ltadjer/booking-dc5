import { Context, Next } from "hono";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    console.log("authMiddleware", c.req.header("Authorization"));
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Token d'authentification manquant" }, 401);
    }

    const token = authHeader.split(" ")[1];
    console.log("token : ", token);
    const decoded = verifyToken(token);
    console.log("decoded : ", decoded);
    // Ajouter les informations de l'utilisateur au contexte
    c.set("user", decoded);

    await next();
  } catch (error) {
    return c.json({ error: "Token invalide ou expiré" }, 401);
  }
};
