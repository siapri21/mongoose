import {createContext, useEffect, useState }from "react";
import "./App.css";
import {BrowserRouter, Link, Route, Routes }from "react-router-dom";

import Home from "./container/pages/home";
import Connexion from "./container/pages/connexion";
import  Inscription from './container/pages/inscription';
import Profile from "./container/pages/profile.jsx";


export const UserContext = createContext();

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return ;
      }

      const response = await fetch("api/users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },

      });

      if (!response.ok) {
        return ;
        
      }

      const {user} = await response.json();
      setUser(user);
      
    }
    getUser();
  }, []);

  function handleLogout() {
    localStorage.removeItem("acess_token");
    setUser(null);
    
  }


  return (

    <UserContext.Provider value={{user:user, setUser: setUser}}>

    <BrowserRouter>
      <nav>
        <Link to={"/"}>Accueil</Link>
        {
          // La condition est a changer plus tard
          !user? (

            <>
              <Link to={"/inscription"}>Inscription</Link>
              <Link to={"/connexion"}>Connexion</Link>
            </> 
          ) : (

            <>

             <Link to={"/profile"}>Profile</Link>
                <button
                  style={{ backgroundColor: "red"

                   }}
                  onClick={handleLogout} >Lagout</button>
            </>
          )
            
        }

      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/inscription" element={<Inscription />}/>
        <Route path="/connexion" element={<Connexion />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
    
      )

}

export default App;

// Créer un composant /components/TodoList.jsx
// Il y'aura un input et un bouton
// Quand on clique sur le bouton, afficher dans une alerte l'entrée de l'utilisateur