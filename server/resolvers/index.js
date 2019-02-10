const { ObjectId } = require('mongodb');

module.exports = {
  Query: {
    me: async (parent, args, { db, userId }) => {
      return await db.collection('users').findOne({ _id: userId })
    },
  },
  User: {
    id: (parent) => parent._id,
  }
};
