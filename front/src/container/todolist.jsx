import { useEffect, useState} from "react"

// Créer un composant /components/TodoList.jsx
export default function TodoList() {
    const [userInput, setUserInput] = useState()
    // 1. Créer une variable d'état: message: {success: boolean, message: string}
  const [message, setMessage] = useState({ success: false, content: "" });

 
// Utiliser le useEffect et fetch pour récuperer les listes de tache
function taskList() {
    const [TaskList, setTaskList] = useState([])
    useEffect (() => {
        const task = async () => {
            
        }
    })

    
}
// Stocker les liste de taches dans une variable d'état
// Utiliser un boucle pour afficher chaque liste de taches

    // Quand on clique sur le bouton, afficher dans une alerte l'entrée de l'utilisateur
    function Changement(e) {
        setUserInput(e.target.value)
    }
    // Il 'yaura un input et un bouton
     async function valideFormulaire() {
         // 3.1 Test: Si l'input est vide afficher le message "Message Obligtoire"
        if(userInput === ""){
            // 3.2 Envoyer la requete, afficher un message de succés
            return setMessage({success: false, content: "titre est obligatoire"})
        }
        // 2. L'afficher dans le JSX
        const reponse = await fetch('/api/todos', {
            method: "POST",
            body: JSON.stringify({title: userInput}),
            headers: {
                'content-Type': 'application/json'
            }
        
        })
       
        // 3. Quand l'utilisateur clique:
        const data = await reponse.json()
        console.log(data);
    }



    // Exercice:
// 1. Ajouter une bouton supprimer pour chaque tache
// 2. Créer une fonction qui reçoit l'id de la tache
// async function deleteTodo(id){
    // 3. Utiliser fetch pour envoyer une requete DELETE a la back end
    // const response = await fetch("/api/todos/" + id, {
        // method: "DELETE",
    // });


// }
// 4. Lier cette fonction avec les bouton de chaque taches
// const newListTodo = todosLists.filtre((ele) => ele_id != id);

// setTodoList(newListTodo);

    return (

        <div>
            <input type="text" placeholder="Entre votre nom user" onChange={Changement} />
            <button onClick={valideFormulaire} >Valide</button>
            <p>{message.content}</p>
        </div>
    )
    
}