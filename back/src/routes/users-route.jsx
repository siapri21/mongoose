import express from "express";
import { UserModel } from "../database/user";
import bcrypt from "bcrypt";

// * Créer un nouveau routeur express pour les utilisateurs
export const usersRouter = express.Router();

// * Route pour l'inscription des utilisateurs
usersRouter.post("/inscription", async (req, res) => {
  console.log(req.body);

  // * Étape 1: Tester les données reçues
  const { email, password, username } = req.body;

  // Vérifier si l'email contient un "@", si le nom d'utilisateur n'est pas vide et si le mot de passe a au moins 6 caractères
  if (!email.includes("@") || username === "" || password.length < 6) {
    return res.status(400).json({ error: "incorrect data" });
  }

  // * Étape 2: Vérifier si l'utilisateur existe déjà
  // Rechercher un utilisateur avec l'email fourni dans la base de données
  const userFromDB = await UserModel.find({ email: email });
  console.log(userFromDB);

  // Si un utilisateur avec cet email existe déjà, retourner une erreur
  if (userFromDB.length > 0) {
    return res.status(401).json({ error: "this user already exists" });
  }

  // * Étape 3: Hasher le mot de passe
  // Hacher le mot de passe avec un coût de 6 pour la fonction bcrypt
  const hashedPassword = await bcrypt.hash(password, 6);
  console.log(hashedPassword);

  // * Étape 4: Enregistrer le nouvel utilisateur dans la base de données
  // Créer une nouvelle instance du modèle User avec les données fournies
  const newUser = new UserModel({
    email,
    hashedPassword,
    username,
  });

  // Sauvegarder le nouvel utilisateur dans la base de données et récupérer l'utilisateur sauvegardé
  const user = await newUser.save();
  console.log(user);

  // Retourner les informations de l'utilisateur sauvegardé dans la réponse
  return res.json({
    user: {
      email: user.email,
      username: user.username,
      id: user._id,
    },
  });
});