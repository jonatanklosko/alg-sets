module.exports = {
  id: (parent) => parent._id,
  algSets: async (parent, args, { db }) => {
    return await db.collection('algSets').find({ createdById: parent._id }).toArray();
  },
};
