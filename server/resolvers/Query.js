const { ObjectId } = require('mongodb');

module.exports = {
  me: async (parent, args, { userId, dataloaders: { userLoader } }) => {
    return await userLoader.load(userId);
  },
  algSet: async (parent, { id }, { dataloaders: { algSetLoader } }) => {
    return await algSetLoader.load(new ObjectId(id));
  },
  algSets: async (parent, { id }, { userId, mongo: { AlgSets } }) => {
    return await AlgSets.find({ secret: false, algs: { $ne: [] } }).toArray();
  },
};
