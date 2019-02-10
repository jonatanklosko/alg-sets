const { ObjectId } = require('mongodb');

module.exports = {
  createAlgSet: async (parent, { createdById, algs = [], name }, { mongo: { AlgSets } }) => {
    const { ops: [algSet] } = await AlgSets.insertOne({
      createdById: new ObjectId(createdById),
      name,
      algs,
    });
    return algSet;
  },
};
