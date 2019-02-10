const { GraphQLServer } = require('graphql-yoga');
const { ObjectId } = require('mongodb');
const cookieParser = require('cookie-parser');
const oauth = require('./oauth');
const resolvers = require('./resolvers');
const { initializeDb, getDb } = require('./database');

(async () => {
  await initializeDb();

  const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: req => ({
      db: getDb(),
      userId: new ObjectId(req.request.signedCookies.userId),
    }),
  });

  server.express.use(cookieParser('cats-the-sweetest-thing'));
  server.express.use('/oauth', oauth);

  server.start(() => console.log('Server running on localhost:4000'));
})();
