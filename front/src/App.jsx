import {useEffect }from "react";
import "./App.css";
import {BrowserRouter, Link, Route, Routes }from "react-router-dom";

import Home from "./container/pages/home";
import Inscription from "./container/pages/about";
import Connexion from "./container/pages/connexion";
import Profile from "./container/pages/inscription";



function App() {


  return (

    
    <BrowserRouter>
      <nav>
        <Link to={"/"}>Accueil</Link>
        {
          // La condition est a changer plus tard
          true ?
            <>
              <Link to={"/inscription"}>Inscription</Link>
              <Link to={"/connexion"}>Connexion</Link>
            </> :
            <Link to={"/profile"}>Profile</Link>
        }
      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/inscription" element={<Inscription />}/>
        <Route path="/connexion" element={<Connexion />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

// Créer un composant /components/TodoList.jsx
// Il y'aura un input et un bouton
// Quand on clique sur le bouton, afficher dans une alerte l'entrée de l'utilisateur