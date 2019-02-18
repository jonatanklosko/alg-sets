const { ObjectId } = require('mongodb');

module.exports = {
  me: async (parent, args, { userId, dataloaders: { userLoader } }) => {
    return await userLoader.load(userId);
  },
  algSet: async (parent, { id }, { dataloaders: { algSetLoader } }) => {
    return await algSetLoader.load(new ObjectId(id));
  },
  algSets: async (parent, { filter = '' }, { userId, mongo: { AlgSets } }) => {
    const regexp = new RegExp(filter.split(/\s+/).join('|'), 'gi');
    return await AlgSets.aggregate([
      { $match:  { secret: false, algs: { $ne: [] } } },
      { $lookup: { from: 'users', localField: 'ownerId', foreignField: '_id', as: 'owner' } },
      { $addFields: { owner: { $arrayElemAt: ['$owner', 0] } } },
      { $match: { $or: [
        { 'owner.name': { $regex: regexp } },
        { name: { $regex: regexp } },
      ] } },
      { $lookup: { from: 'users', localField: '_id', foreignField: 'starredAlgSetIds', as: 'stargazers' } },
      { $addFields: { starCount: { $size: '$stargazers' } } },
      { $sort: { starCount: -1 } },
    ]).toArray();
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
