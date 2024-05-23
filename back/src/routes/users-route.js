import express from "express";
import { UserModel } from "../database/user.js";
import bcrypt from "bcrypt";
import jsonwebtoken from 'jsonwebtoken';



const SECRET_Key = "azerty"
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


  // Exercice:
// Créer un route: /api/user/connexion
usersRouter.post("/connexion", async(req,res) => {
  // Verifier si l'email et le mot de passe on ete réçu dans le coprs de la requete sinon retourner un erreur

  const {email, password} = req.body;
  if (!email ||!password) {
    return res.status(400).json({erro: "le mail et password"});
  }

  if (!email.includes('@') || password < 6) {
    return res.status(400).json({erro: "le mail est incorrecte"});
  }
  // Récuperer l'utilisateur depuis la base de données avec son mail, retourner un erreur si il n'existe pas
  const [emailFromDB] = await UserModel.find({email});

  if (!emailFromDB) {
    return res.status(400).json({message: "inscription non valide"})
    
  }
// Verifier si le mot de passe est correcte (utiliser la methode compare de bcrypt)
// Retourner 
  const comparePassword = await bcrypt.compare(password,emailFromDB.hashedPassword)
  if (!comparePassword) {
    return res.status(400).json({erro: " password incorrecte"});
    
  }


  const access_token = jsonwebtoken.sign({id:emailFromDB._id}, SECRET_Key)
  return res.json({user: emailFromDB, access_token})
})


usersRouter.get('/me', async(req,rep) =>{
  const acess_token = req.headers.authorization;
console.log(acess_token);
  const VerifierToken = jsonwebtoken.verify(acess_token.split(' ')[1], SECRET_Key)

  if (!VerifierToken) {

    return res.status(400).json({erro: " token invalide"});
    
  }

  const user = await UserModel.findById(VerifierToken.id)

  return rep.json({user})
})

//* -----------------PUT--------------------------- 

usersRouter.put('/me', async(req, res) => {
  const {username, avaterUrl} = req.body
  const access_token = req.headers.authorization
  console.log(username);
  if (!username) {
    return res.status(400).json({erro: "erreur"});
  }
  
  const VerifierToken = jsonwebtoken.verify(access_token.split(' ')[1], SECRET_Key)

  if (!VerifierToken) {
    return res.status(400).json({erro: " token invalide"});
  }

  const updateUser = await UserModel.findById(VerifierToken.id)

  if (!updateUser) {
    res.status(500).json({ message: 'Erreur du serveur' });
    
  }
  updateUser.username = username
  updateUser.avaterUrl = avaterUrl

  await updateUser.save();

  return res.json({user:updateUser})
})

  
