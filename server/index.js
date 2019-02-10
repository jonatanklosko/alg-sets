const { GraphQLServer } = require('graphql-yoga');
const { ObjectId } = require('mongodb');
const cookieParser = require('cookie-parser');
const oauth = require('./oauth');
const resolvers = require('./resolvers');
const { initializeDb, getDb } = require('./database');
const dataloaders = require('./dataloaders');

const COOKIES_SECRET = 'cats-the-sweetest-thing';

(async () => {
  await initializeDb();

  const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: ({ request }) => ({
      db: getDb(),
      dataloaders: dataloaders(),
      userId: new ObjectId(request.signedCookies.userId),
    }),
  });

  server.express.use(cookieParser(COOKIES_SECRET));
  server.express.use('/oauth', oauth);

  server.start(() => console.log('Server running on localhost:4000'));
})();
