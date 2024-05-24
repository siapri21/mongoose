import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";



export default function Posts() {

  const { user } = useContext(UserContext);
  console.log(user);


const navigate = useNavigate()

const [imageUrl, setImageUrl] = useState("")

const [message , setMessage] = useState({
    success: false,
    message: "",
})


const [title, setTitle] = useState("")
const [titleError, setTitleError] = useState("");

function handleTitle(e) {
    setTitleError("");
    setTitle(e.target.value);
    
    if (title == "") {
        return setTitleError("Veuillez entrez un titre");
    }

}   


const [description, setDescription] = useState("")
const [descriptionError, setDescriptonError] = useState("");
  
    
    function handleDescription(e) {
      setDescriptonError("");
      setDescription(e.target.value);
  
      if (e.target.value == "") {
        return setDescriptonError("description  obligatoire");
      }
    }
      
    const handlePostSubmit = async(e) => {
        e.preventDefault();
        setMessage("")
        
       
        const User = {
            description:description,
            imageUrl:imageUrl,
            title:title,
            userID: user._id,

        }
    
        const tokenPost = localStorage.getItem("access_token")
    
        const response = await fetch("/api/posts/post", {
                 method: 'POST',
                 body: JSON.stringify(User),
                 headers: {
                    "Content-Type": "application/json",
                    Authorization:"Bearer "+ tokenPost
                 }
        })

        if (!response.ok) {
            if (response.status === 403) {
                return setError({
                    success: false,
                    message: "échec de la requette",
                  });
            }
            const data = await response.json();
            localStorage.getItem("access_token", data.access_token)
    
            return setMessage({ success: true, message: "requette valide" });
        } 
    }

    

    return (
        <>
        <div>
          <h2>Créer une post </h2>
        <div>
      <form action="">
      
        <div>
          <label htmlFor="title">Titre: </label>
          <input
            type="text"
            id="text"
            placeholder="tu veux parler de quoi?"
            value={title}
            onChange={handleTitle}
          />
          <p>{titleError}</p>
        </div>

        <div>
          <label htmlFor="">Description: </label>
          <textarea
            type="text"
            id="text"
            placeholder="description"
            value={description}
            onChange={handleDescription}
          />
          <p>{descriptionError}</p>
        </div>

        <button type="submit" onClick={handlePostSubmit}>
          Publier
        </button>
      </form>
    </div>
        </div>
        
        </>
    )


}