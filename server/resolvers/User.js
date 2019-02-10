module.exports = {
  id: (parent) => parent._id,
  algSets: async (parent, args, { mongo: { AlgSets } }) => {
    return await AlgSets.find({ createdById: parent._id }).toArray();
  },
};
