const { GraphQLServer } = require('graphql-yoga');
const { ObjectId } = require('mongodb');
const cookieParser = require('cookie-parser');
const oauth = require('./oauth');
const resolvers = require('./resolvers');
const connectMongo = require('./mongo-connector');
const dataloaders = require('./dataloaders');

const COOKIES_SECRET = 'cats-the-sweetest-thing';

(async () => {
  const mongo = await connectMongo();

  const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: ({ request }) => ({
      mongo,
      dataloaders: dataloaders(mongo),
      userId: new ObjectId(request.signedCookies.userId),
    }),
  });

  server.express.use(cookieParser(COOKIES_SECRET));
  server.express.use('/oauth', oauth(mongo));

  server.start(() => console.log('Server running on localhost:4000'));
})();
