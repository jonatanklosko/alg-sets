const fs = require('fs');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { ObjectId } = require('mongodb');
const cookieParser = require('cookie-parser');
const oauth = require('./oauth');
const resolvers = require('./resolvers');
const connectMongo = require('./mongo-connector');
const dataloaders = require('./dataloaders');

const COOKIES_SECRET = 'cats-the-sweetest-thing';
const PORT = 4000;

const app = express();
app.use(cookieParser(COOKIES_SECRET));

(async () => {
  const mongo = await connectMongo();

  app.use('/oauth', oauth(mongo));

  const server = new ApolloServer({
    typeDefs: gql(fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8')),
    resolvers,
    context: ({ req }) => ({
      mongo,
      dataloaders: dataloaders(mongo),
      userId: new ObjectId(req.signedCookies.userId),
    }),
  });

  server.applyMiddleware({
    app,
    path: '/api',
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });

  app.listen({ port: PORT }, () => console.log('Server running on http://localhost:4000'));
})();
