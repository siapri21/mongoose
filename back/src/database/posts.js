import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userID: { type: String , required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String }
});

export const PostModel = mongoose.model('Post', postSchema);