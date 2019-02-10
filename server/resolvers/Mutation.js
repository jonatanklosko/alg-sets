const { ObjectId } = require('mongodb');

module.exports = {
  createAlgSet: async (parent, { createdById, algs = [], name }, { db }) => {
    const { ops: [algSet] } = await db.collection('algSets').insertOne({
      createdById: new ObjectId(createdById),
      name,
      algs,
    });
    return algSet;
  },
};
