import express from 'express';

export const todoRoute = express.Router();

// BUT général: réaliser un CRUD sur le todos

// Exercice 1:
// Créer une route sur la methode post avec l'url'/'
export const exoRoute = express.Router();
// Récuperer les données du body: title;
exoRoute.post('/api/todos', (req,res) =>{
      const dataTile = req.body

      // Tester si dans le body y'a title:
      if (!dataTile.title) {
        return res.status((400).json({erro: "le body est dans la liste"}) )
      }else{
        return res.end('ok')
      }
})

// Si pa title retourne 400 avec erreur
// Sinon: retour message "ok"


