import express from 'express';
import { PostModel } from '../database/posts.js';
import jsonwebtoken from 'jsonwebtoken';
import { UserModel } from '../database/user.js';

const SECRET_Key = "azerty"

export const postsRouter = express.Router()

// *------------------------POST---------------------

postsRouter.post('/post' , async(req, res) => {

    const {description, title ,imageUrl,userID} = req.body
  console.log(req.body);
    const access_token = req.headers.authorization
    
    if (!title||!description) {
        return res.status(400).json({ error: 'les données sont invalide' })
    }

        const newPost = new PostModel({
           userID,
            description,
            title,
            imageUrl,
        })

        const newPostAjoute = await newPost.save()



        return res.json({
          newPostAjoute:{
            title: newPostAjoute.title,
            description: newPostAjoute.description,
            imageUrl: newPostAjoute.imageUrl,
          }
        })  
})

// *------------------------GET-------------------
postsRouter.get('/me', async(req,rep) =>{
  
  const acess_token = req.headers.authorization;

console.log(acess_token);
  const VerifierToken = jsonwebtoken.verify(acess_token.split(' ')[1], SECRET_Key)

  if (!VerifierToken) {

    return res.status(400).json({erro: " token invalide"});
    
  }

  const userToken = await UserModel.findById(VerifierToken.id)
  if (!userToken) {
    return res.status(400).json({erro: " utilisateur non retrouvé"});
  }

  const userPost = await PostModel.find({userID:VerifierToken.id})
  if (!userPost) {
    return res.status(400).json({erro: " utilisateur trouvé"});
  }

  return rep.json({userPost})
})
