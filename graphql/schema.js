const { gql } = require("apollo-server-express");

// GraphQL schema defined with the gql template literal
const typeDefs = gql`
  # Post type
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  # Queries
  type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  # Mutations
  type Mutation {
    createPost(title: String!, content: String!): Post
    updatePost(id: ID!, title: String, content: String): Post
    deletePost(id: ID!): Post
  }
`;

module.exports = typeDefs;
