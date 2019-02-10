module.exports = {
  me: async (parent, args, { db, userId }) => {
    return await db.collection('users').findOne({ _id: userId });
  },
};
