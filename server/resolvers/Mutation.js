const { ObjectId } = require('mongodb');

const getDocument = ({ value }) => {
  if (!value) throw new Error('Document not found.');
  return value;
};

module.exports = {
  createAlgSet: async (parent, { name, secret, algs = [] }, { userId, mongo: { AlgSets } }) => {
    const { ops: [algSet] } = await AlgSets.insertOne(
      { ownerId: userId, name, secret, algs }
    );
    return algSet;
  },
  updateAlgSet: async (parent, { id, ...attrs }, { userId, mongo: { AlgSets } }) => {
    return getDocument(
      await AlgSets.findOneAndUpdate(
        { _id: new ObjectId(id), ownerId: userId },
        { $set: attrs },
        { returnOriginal: false },
      )
    );
  },
  deleteAlgSet: async (parent, { id }, { userId, mongo: { AlgSets, Users } }) => {
    await Users.update({}, { $pull: { starredAlgSetIds: new ObjectId(id) } });
    return getDocument(
      await AlgSets.findOneAndDelete({ _id: new ObjectId(id), ownerId: userId })
    );
  },
  addAlgToAlgSet: async (parent, { id, alg }, { userId, mongo: { AlgSets } }) => {
    return getDocument(
      await AlgSets.findOneAndUpdate(
        { _id: new ObjectId(id), ownerId: userId },
        { $addToSet: { algs: alg } },
        { returnOriginal: false },
      )
    );
  },
  removeAlgFromAlgSet: async (parent, { id, alg }, { userId, mongo: { AlgSets } }) => {
    return getDocument(
      await AlgSets.findOneAndUpdate(
        { _id: new ObjectId(id), ownerId: userId },
        { $pull: { algs: alg } },
        { returnOriginal: false },
      )
    );
  },
  starAlgSet: async (parent, { id }, { userId, mongo: { Users, AlgSets } }) => {
    const algSet = await AlgSets.findOne({ _id: new ObjectId(id) });
    await Users.updateOne({ _id: userId }, { $addToSet: { starredAlgSetIds: algSet._id } });
    return algSet;
  },
  unstarAlgSet: async (parent, { id }, { userId, mongo: { Users, AlgSets } }) => {
    const algSet = await AlgSets.findOne({ _id: new ObjectId(id) });
    await Users.updateOne({ _id: userId }, { $pull: { starredAlgSetIds: algSet._id } });
    return algSet;
  },
};
