import mongoose from "mongoose";

// * Définir un schéma pour le modèle User:
const UserSchema = mongoose.Schema({
  // Champ pour l'email de l'utilisateur, il doit être de type String, requis et unique
  email: { type: String, required: true, unique: true },
  
  // Champ pour le nom d'utilisateur, il doit être de type String et requis
  username: { type: String, required: true },
  
  // Champ pour le mot de passe haché, il doit être de type String et requis
  hashedPassword: { type: String, required: true },
});

// * Exporter le modèle pour qu'il puisse être utilisé ailleurs:
// Le premier paramètre est le nom de la collection dans la base de données
export const UserModel = mongoose.model("user", UserSchema);
