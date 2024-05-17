import './App.css'
import { useEffect } from 'react'
import TodoList from './container/todolist';


function App() {

  useEffect(() => {

    async function getPing() {
      
      const reponse = await fetch('/api/ping');
      const data = await reponse.json()
      console.log(data);
      console.log(reponse);
    }

    getPing()
  }, [])

  
return (
    <>
      <div>
        <h1>helloo</h1>
      <TodoList></TodoList>
      </div>
    </>
  )
}

export default App


