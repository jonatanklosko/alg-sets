module.exports = {
  id: (parent) => parent._id,
  createdBy: async (parent, args, { db }) => {
    return await db.collection('users').findOne({ _id: parent.createdById });
  },
};
