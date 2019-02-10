const { GraphQLServer } = require('graphql-yoga');
const cookieParser = require('cookie-parser');
const oauth = require('./oauth');

const typeDefs = `
  type Query {
    hello(name: String): String!
    me: Int
  }
`;

const resolvers = {
  Query: {
    hello: (parent, { name = 'bro' }) => `Yo ${name}, sup?`,
    me: (parent, args, context) => context.userId
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    userId: req.request.signedCookies.userId,
  }),
});

server.express.use(cookieParser('cats-the-sweetest-thing'));
server.express.use('/oauth', oauth);

server.start(() => console.log('Server running on localhost:4000'));
