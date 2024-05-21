import { useState } from "react";

// TODO:
// Créer un formulaire avec:
// input pour email - Erreur: Email incorrect !
// input pour username - Minimum 1 caractères: Erreur: Username obligatoire !
// input pour password - Minimum 6 caractères: Erreur: Mot de passe trop court !
// input pour confirmer password - égale a password: Erreur: Les Mots de passe sont différent !
// bouton pour valider le formulaire


// Lorsque l'input est lié à une variable d'état par la valeur de l'input, il est appelé un champ contrôlé (et donc un formulaire contrôlé)
export default function Inscription() {
    // État pour l'email et son message d'erreur
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
  
    // Fonction de gestion pour l'email
    function handleUserEmail(e) {
      setEmailError("");
      const email = e.target.value;
      setEmail(email);
  
      // Vérifier si l'email est vide
      if (email == "") {
        return setEmailError("email is mandatory");
      }
      // Vérifier si l'email contient '@'
      if (!email.includes("@")) return setEmailError("enter a valid email");
    }
  
    // État pour le nom d'utilisateur et son message d'erreur
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
  
    // Fonction de gestion pour le nom d'utilisateur
    function handleUsername(e) {
      // Effacer le message d'erreur à chaque fois que l'utilisateur saisit une nouvelle entrée
      setUsernameError("");
      setUsername(e.target.value);
  
      // Vérifier si le nom d'utilisateur est vide
      if (e.target.value == "") {
        return setUsernameError("username is mandatory");
      }
    }
  
    // État pour le mot de passe et son message d'erreur
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
  
    // Fonction de gestion pour le mot de passe
    function handleUserPassword(e) {
      setPasswordError("");
      setPassword(e.target.value);
  
      // Vérifier si le mot de passe contient au moins 6 caractères
      if (e.target.value.length < 6) {
        return setPasswordError("password must be at least 6 characters long");
      }
    }
  
    // État pour la confirmation du mot de passe et son message d'erreur
    const [confirm, setConfirm] = useState("");
    const [confirmError, setConfirmError] = useState("");
  
    // Fonction de gestion pour la confirmation du mot de passe
    function handleUserConfirm(e) {
      setConfirmError("");
      setConfirm(e.target.value);
  
      // Vérifier si le mot de passe et la confirmation correspondent
      if (e.target.value != password) {
        return setConfirmError("the 2 passwords don't match");
      }
    }
  
    // État pour afficher un message de succès ou d'échec après la soumission du formulaire
    const [formMessage, setFormMessage] = useState({
      success: false,
      message: "",
    });
  
    // Fonction de gestion pour la soumission du formulaire
    async function handleSubmit(e) {
      e.preventDefault();
  
      // Vérifier les conditions de base avant d'envoyer la requête
      if (username == "" || !email.includes("@") || password.length < 6) {
        return;
      }
  
      // Envoyer la requête au backend : /api/inscription -> email, username, password
      const user = {
        email: email,
        username: username,
        password: password,
      };
  
      const response = await fetch("/api/users/inscription", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
  
      // Gérer les réponses de l'API
      if (!response.ok) {
        if (response.status === 401) {
          return setFormMessage("this email is already used");
        }
        console.log(response);
        return setFormMessage({
          success: false,
          message: "an error has occurred, please try again later",
        });
      }
  
      return setFormMessage({
        success: true,
        message: "Signup successful",
      });
    }
  
    // Rendu du formulaire
    return (
      <div className="form-div">
        <form action="">
          <div>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="email"
              placeholder="enter your email"
              onChange={handleUserEmail}
              value={email}
            />
            <p>{emailError}</p>
          </div>
          <div>
            <label htmlFor="Username">Username: </label>
            <input
              type="text"
              placeholder="enter your username"
              onChange={handleUsername}
            />
            <p>{usernameError}</p>
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              placeholder="create your password"
              onChange={handleUserPassword}
            />
            <p>{passwordError}</p>
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password: </label>
            <input
              type="password"
              placeholder="confirm your password"
              onChange={handleUserConfirm}
            />
            <p>{confirmError}</p>
          </div>
          <button
            style={{
              padding: "5px",
              backgroundColor: "orange",
              borderRadius: "5px",
            }}
            type="submit"
            onClick={handleSubmit}
          >
            Sign up
          </button>
          <p style={{ color: formMessage.success ? "green" : "red" }}>
            {formMessage.message}
          </p>
        </form>
      </div>
    );
  }