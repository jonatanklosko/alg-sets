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
  randomAlgs: async (parent, { count }, { mongo: { AlgSets } }) => {
    const result = await AlgSets.aggregate([
      { $match: { secret: false, algs: { $ne: [] } } },
      { $project: { algs: 1, _id: 0 } },
      { $sample: { size: count } },
      { $unwind: '$algs' },
      { $sample: { size: count } },
      { $project: { 'algs': 1 } }
    ]).toArray();
    return result.map(({ algs }) => algs);
  },
};
