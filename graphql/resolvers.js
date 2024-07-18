const Post = require("../models/Post");

const resolvers = {
  Query: {
    // Resolver for fetching all posts
    posts: async () => {
      try {
        return await Post.find();
      } catch (error) {
        throw new Error("Error fetching posts");
      }
    },
    // Resolver for fetching a post by ID
    post: async (parent, { id }) => {
      console.log(id);
      try {
        return await Post.findById(id);
      } catch (error) {
        throw new Error(`Error fetching post with ID: ${id}`);
      }
    },
  },

  Mutation: {
    // Resolver for creating a new post
    createPost: async (parent, { title, content }) => {

      try {
        const post = new Post({ title, content });
        return await post.save();
      } catch (error) {
        throw new Error("Error creating a new post");
      }
    },

    // Resolver for updating an existing post
    updatePost: async (parent, { id, title, content }) => {
      
      try {
        return await Post.findByIdAndUpdate(
          id,
          { title, content },
          { new: true }
        );
      } catch (error) {
        throw new Error(`Error updating post with ID: ${id}`);
      }
    },

    // Resolver for deleting a post
    deletePost: async (parent, { id }) => {
      try {
        return await Post.findByIdAndDelete(id);
      } catch (error) {
        throw new Error(`Error deleting post with ID: ${id}`);
      }
    },
  },
};

module.exports = resolvers;
