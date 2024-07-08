const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const Post = require("./models/Post");

const db = "mongodb://localhost:27017/graphql-db";
const PORT = 5000;

const app = express();

// To connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(cors());

// To create an instance of ApolloServer and to start the Apollo Server
let apolloServer = null;
async function startGQLServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app }); // Using as middleware
}
startGQLServer();

//REST API endpoints
app.get("/", function (req, res) {
  res.json({ message: "Welcome! REST api is responding on root /" });
});

//To test if REST API /getPosts is working
app.get("/getPosts", async function (req, res) {
  try {
    const posts = await Post.find();
    if (!posts.length) {
      console.log("Data not found!");
      res.status(200).json({
        message:
          "Success! data not found but got response from REST API /getPosts",
      });
    } else {
      res.status(200).json({
        posts: posts,
        message: "Success! got data from REST API /getPosts",
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

//To start the express server
app.listen({ port: PORT }, () =>
  console.log(
    `Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  )
);
