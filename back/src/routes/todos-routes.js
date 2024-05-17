import express from 'express';
import { TodoModel } from '../database/todo-list.js';


// BUT général: réaliser un CRUD sur le todos

export const todoRoute = express.Router();
// Exercice 1:
todoRoute.post('/', async (req, res) => {
  const data = req.body
  if (!data.title) {
      return res.status(400).json({ error: 'titre obligatoire' })
  }
  const newTodoList = new TodoModel({
      title : data.title,
      createdAt : new Date ()
  })
  // enregitre dans la bdd
  const todoListAjouter = await newTodoList.save()

  return res.json({todo:todoListAjouter})
})

// Créer une route sur la methode post avec l'url'/'
// Récuperer les données du body: title;
// exoRoute.post('/api/todos', (req,res) =>{
      // const dataTile = req.body

      // Tester si dans le body y'a title:
      // if (!dataTile.title) {
        // return res.status((400).json({erro: "le body est dans la liste"}) )
        // Si pa title retourne 400 avec erreur
      // }else{
        // Sinon: retour message "ok"
        // return res.end('ok')
      // }
// })



// Exercice 2:
// 1. Ajouter un route "GET" sur l'url "/"

// 2. Lire la doc de mongoose pour apprendre a récuperer tous les document du collection.
// 3. Utiliser le model pour récuperer toutes les todos de la DB
todoRoute.get('/', async (req,res) => { 
  const todo = await TodoModel.find();
  res.json(todo)
})
// 4. Retourner la liste de toutes les todos. 


// Exercice 3:
// 1. Ajouter un route sur '/api/todos/id',

// 2. Récuperer l'id depuis les paramètre d'url
todoRoute.get('/:id' , async(req ,res) => {
  const cibleId = req.params.id
  // 3. Utiliser le model pour récuperer la todo avec son id
  const todoId = await TodoModel.findById(cibleId).exec();
  
  // 4. Si la todo n'existe pas retourner 404
  if (!todoId) {
    return res.status(400).json({error: `la task n'existe pas`})
  }
  // 5. Si la todo exist retourner la todo
  res.json(todoId)
})

// Exercice 4:
// 1. Créer la route '/api/todos/id'  avec la method PUT
todoRoute.put('/:id', async(req, res) => {
  // 2. Récuperer l'id dans les paramètre d'url
  const todoId = req.params.id
  // 3. Récuperer le titre dans les body de la requete
  const {title} = req.body
  // 4. Récuperer la todo avec son id
  const todo = await TodoModel.findById(todoId).exec();
  console.log(todo);
  // 4.1 Si elle existe pas, retourner 404
  if (!title) {
    return res.status(400).json({error: 'erreur'})
  }
  // 4.2 Si elle existe;
      // 4.2.1: Mettre a jour le titre de la todolist
      const todoList = await TodoModel.findByIdAndUpdate(todoId  , {title});
      // 4.2.1: Retourner la todolist 
      res.json(todoList)

})