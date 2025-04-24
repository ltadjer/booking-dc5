import { Context } from "hono";
import prisma from "../lib/prisma";
import { hashPassword, comparePasswords } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { z } from "zod";

// Schéma de validation pour l'inscription
const signUpSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  name: z.string().optional(),
});

// Schéma de validation pour la connexion
const signInSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string(),
});

export const signUp = async (c: Context) => {
  try {
    const body = await c.req.json();
    const validatedData = signUpSchema.parse(body);

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return c.json(
        { error: "Un utilisateur avec cet email existe déjà" },
        400
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(validatedData.password);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
      },
    });

    // Générer le token JWT avec le rôle
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return c.json({
      message: "Utilisateur créé avec succès",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    console.error("Erreur lors de l'inscription:", error);
    return c.json({ error: "Erreur lors de l'inscription" }, 500);
  }
};

export const signIn = async (c: Context) => {
  try {
    const body = await c.req.json();
    const validatedData = signInSchema.parse(body);

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      return c.json({ error: "Email ou mot de passe incorrect" }, 401);
    }

    // Vérifier le mot de passe
    const isValidPassword = await comparePasswords(
      validatedData.password,
      user.password
    );

    if (!isValidPassword) {
      return c.json({ error: "Email ou mot de passe incorrect" }, 401);
    }

    // Générer le token JWT avec le rôle
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return c.json({
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    console.error("Erreur lors de la connexion:", error);
    return c.json({ error: "Erreur lors de la connexion" }, 500);
  }
};
