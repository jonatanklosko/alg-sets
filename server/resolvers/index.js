const { ObjectId } = require('mongodb');

module.exports = {
  Query: {
    hello: (parent, { name = 'bro' }) => `Yo ${name}, sup?`,
    me: async (parent, args, { db, userId }) => {
      return await db.collection('users').findOne({ _id: userId })
    },
  },
  User: {
    id: (parent) => parent._id,
  }
};
