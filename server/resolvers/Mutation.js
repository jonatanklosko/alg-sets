const { ObjectId } = require('mongodb');

const getDocument = ({ value }) => {
  if (!value) throw new Error('Document not found.');
  return value;
};

module.exports = {
  createAlgSet: async (parent, { name, secret, algs = [] }, { userId, mongo: { AlgSets } }) => {
    const { ops: [algSet] } = await AlgSets.insertOne(
      { createdById: userId, name, secret, algs }
    );
    return algSet;
  },
  updateAlgSet: async (parent, { id, ...attrs }, { userId, mongo: { AlgSets } }) => {
    return getDocument(
      await AlgSets.findOneAndUpdate(
        { _id: new ObjectId(id), createdById: userId },
        { $set: attrs },
        { returnOriginal: false },
      )
    );
  },
  deleteAlgSet: async (parent, { id }, { userId, mongo: { AlgSets } }) => {
    return getDocument(
      await AlgSets.findOneAndDelete({ _id: new ObjectId(id), createdById: userId })
    );
  },
  addAlgToAlgSet: async (parent, { id, alg }, { userId, mongo: { AlgSets } }) => {
    return getDocument(
      await AlgSets.findOneAndUpdate(
        { _id: new ObjectId(id), createdById: userId },
        { $addToSet: { algs: alg } },
        { returnOriginal: false },
      )
    );
  },
  removeAlgFromAlgSet: async (parent, { id, alg }, { userId, mongo: { AlgSets } }) => {
    return getDocument(
      await AlgSets.findOneAndUpdate(
        { _id: new ObjectId(id), createdById: userId },
        { $pull: { algs: alg } },
        { returnOriginal: false },
      )
    );
  },
};
