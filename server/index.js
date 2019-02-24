const path = require('path');
/* Load envinroment variables. */
require('dotenv').config({ path: path.join(__dirname, '.env') });

const fs = require('fs');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { ObjectId } = require('mongodb');
const cookieParser = require('cookie-parser');
const oauth = require('./oauth');
const resolvers = require('./resolvers');
const connectMongo = require('./mongo-connector');
const dataloaders = require('./dataloaders');
const { PRODUCTION, PORT, COOKIES_SECRET } = require('./config');

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
    cors: PRODUCTION ? false : { origin: 'http://localhost:3000', credentials: true },
    bodyParserConfig: { limit: '5mb' },
  });

  const buildPath = path.join(__dirname, '../client/build');
  app.use(express.static(buildPath));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });

  app.listen({ port: PORT }, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
})();
