const { ObjectId } = require('mongodb');

module.exports = {
  createAlgSet: async (parent, { name, secret, algs = [] }, { userId, mongo: { AlgSets } }) => {
    const { ops: [algSet] } = await AlgSets.insertOne({
      createdById: userId,
      name,
      secret,
      algs,
    });
    return algSet;
  },
};
