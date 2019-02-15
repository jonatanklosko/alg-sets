module.exports = {
  id: (parent) => parent._id,
  algSets: async (parent, args, { mongo: { AlgSets } }) => {
    return await AlgSets.find({ createdById: parent._id }).toArray();
  },
  starredAlgSets: async (parent, args, { dataloaders: { algSetLoader } }) => {
    return await algSetLoader.loadMany(parent.starredAlgSetIds);
  },
};
