const { ObjectId } = require('mongodb');

module.exports = {
  createAlgSet: async (parent, { name, algs = [] }, { userId, mongo: { AlgSets } }) => {
    const { ops: [algSet] } = await AlgSets.insertOne({
      createdById: userId,
      name,
      algs,
    });
    return algSet;
  },
};
