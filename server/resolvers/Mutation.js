const { ObjectId } = require('mongodb');

module.exports = {
  createAlgSet: async (parent, { name, secret, algs = [] }, { userId, mongo: { AlgSets } }) => {
    const { ops: [algSet] } = await AlgSets.insertOne(
      { createdById: userId, name, secret, algs }
    );
    return algSet;
  },
  updateAlgSet: async (parent, { id, ...attrs }, { userId, mongo: { AlgSets } }) => {
    const { value: algSet, ...k } = await AlgSets.findOneAndUpdate(
      { _id: new ObjectId(id), createdById: userId },
      { $set: attrs },
      { returnOriginal: false },
    );
    if (!algSet) throw new Error(`No alg set found with id ${id}`);
    return algSet;
  },
};
