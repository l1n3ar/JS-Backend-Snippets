import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find(); //Asynchronous action because it will take time - This is Mongo DB inbuilt
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const newPost = new PostMessage(req.body);
  try {
    await newPost.save(); //Asynchronous action because it will take time - This is Mongo DB inbuilt
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
