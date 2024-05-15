// Lancer un serveur avec express sur le port 3005
import express from "express"
import mongoose, { get } from 'mongoose';
import { exoRoute, todoRoute } from "./routes/todos-routes.js";

// L'URI de la base de données locale
const MONGODB_URI = "mongodb://127.0.0.1:27017/todo-list";

const serveur = express()
const PORT = 3005

// Utilisation du middleware pour parser le body
serveur.use(express.json());

// creer une route 
serveur.use('/api/todos', todoRoute);
serveur.post('/api/todos', exoRoute);






serveur.listen(PORT, () =>{
    console.log(`lance le serveur`);
    console.log(`http://localhost:${PORT}`);


    /*---------------------CONNEXION DE LA BDD-------------------*/ 

    mongoose.connect(MONGODB_URI).then(() => {
        // Afficher dans la console que la Base de donnée BDD est connecté
        console.log("Connecté à la base de données");
      }).catch((err) => {
        // Erreur dans le then
        console.log("BDD non connecté");
        console.log(err);
      });
    
})

