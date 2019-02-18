const { ObjectId } = require('mongodb');

module.exports = {
  me: async (parent, args, { userId, dataloaders: { userLoader } }) => {
    return await userLoader.load(userId);
  },
  algSet: async (parent, { id }, { dataloaders: { algSetLoader } }) => {
    return await algSetLoader.load(new ObjectId(id));
  },
  algSets: async (parent, { filter = '', offset = 0, limit = 10 }, { userId, mongo: { AlgSets } }) => {
    const regexp = new RegExp(filter.split(/\s+/).filter(s => s).join('|'), 'gi');
    const [result] = await AlgSets.aggregate([
      { $match:  { secret: false, algs: { $ne: [] } } },
      { $lookup: { from: 'users', localField: 'ownerId', foreignField: '_id', as: 'owner' } },
      { $addFields: { owner: { $arrayElemAt: ['$owner', 0] } } },
      { $match: { $or: [
        { 'owner.name': { $regex: regexp } },
        { name: { $regex: regexp } },
      ] } },
      { $lookup: { from: 'users', localField: '_id', foreignField: 'starredAlgSetIds', as: 'stargazers' } },
      { $addFields: { starCount: { $size: '$stargazers' } } },
      { $facet: {
        edges: [
          { $sort: { starCount: -1, _id: 1 } },
          { $skip: offset },
          { $limit: Math.min(limit, 100) },
        ],
        totalCount: [{ $count: 'count' }],
      } },
      { $addFields: { totalCount: { $arrayElemAt: ['$totalCount', 0] } } },
      { $addFields: { totalCount: { $cond: { if: '$totalCount.count', then: '$totalCount.count', else: 0 } } } }
    ]).toArray();
    return result;
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
