import { useContext, useState } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { UserContext } from "../../App";
import { CiUser } from 'react-icons/ci';
import "../../styles/profile.css"


export default function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const  [username, setUsername] = useState("") 
  const [usernameError , setUsernameError] = useState("")
    // Fonction de gestion pour le nom d'utilisateur
    function handleUsername(e) {
        // Effacer le message d'erreur à chaque fois que l'utilisateur saisit une nouvelle entrée
        setUsernameError("");
        setUsername(e.target.value);
    
        // Vérifier si le nom d'utilisateur est vide
        if (e.target.value == "") {
          return setUsernameError("nouvel nom obligatoire");
        }
      }


  const [avatarUrl, setAvatarUrl] = useState("") ;
  const [avatarError , setAvatarError] = useState("");
    // Fonction de gestion pour le nom d'utilisateur
    function handleAvatarUrl(e) {
        // Effacer le message d'erreur à chaque fois que l'utilisateur saisit une nouvelle entrée
        setAvatarError("");
        setAvatarUrl(e.target.value);
    
        // Vérifier si le nom d'utilisateur est vide
        if (e.target.value == "") {
          return setAvatarError("Url obligation");
        }
      }


  const[error, setError] = useState({
    success: false,
    message: "",
  })

//   diriger l'user vers la page de connexion s'il n'est pas connecté

  if (!user) {
    return navigate("/connexion");
  }

//   gere la sousimission du formulaire
  const handleSubmit = async(e) =>{
    e.preventDefault();
    setError("")
  
    const user = {
        username: username,
        avatarUrl: avatarUrl,
      };

      const tooken = localStorage.getItem("access_token")

  const response = await fetch('/api/users/me' ,{
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
        "Content-Type": "application/json",
        Authorization:"Bearer "+tooken
    }
  })
//   envoye une erreur si la requete echoue
  if (!response.ok) {
    if (response.status === 401) {

      return setError({
        success: false,
        message: "échec de la mise à jour du profil",
      });
    }
}
    const data = await response.json();
    
    return setError({ success: true, message: "mise à jour validé" });
  }


  return (
    <div className="profile-container">
        {/* l'avatar d'utilisateur */}
        {user.avaterUrl ? (
            <img 
            src={user.avaterUrl} 
            alt="Avatar d'utilisateur"
            className="profile-avatar"
          

             />
        ) :(

            <CiUser  className="avatar"/> 
        )
    }
        <div className="profile-info">
        <p className="username">{user.username}</p>     
        <p className="email">{user.email}</p>
        </div>

        <div>
            <button>Modifier les informations</button>
        </div>

        <div  className="profile-form" >
            <div>
              <input type="text" 
                 placeholder="votre nom"
                  value={username}
                   onChange={handleUsername}
                  />
                  <p>{usernameError}</p>
            </div>

            <div>
                <input type="text"
                placeholder="url"
                value={avatarUrl}
                onChange={handleAvatarUrl}
                 />

                 <p>{avatarError}</p>
            </div>

            <button onClick={handleSubmit}>Enregistre</button>

        </div>
    
        

    </div>
  )


}