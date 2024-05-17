import mongoose from "mongoose";

// definir un schema
const TodoListSchema = mongoose.Schema({
    title: {type:String, required:true},
    createAt: {type:Date},
    todos: [
        {
            title:{type: String, required: true},
            isDone: { type: Boolean, required: true, default: false}  //isDone cest pour savoir si la tache est fini

        }
    ]
})

// todolist de la collection dans la bdd

export const TodoModel = mongoose.model("todolist", TodoListSchema)



//exporte le mode 