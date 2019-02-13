const { ObjectId } = require('mongodb');

module.exports = {
  me: async (parent, args, { userId, dataloaders: { userLoader } }) => {
    return await userLoader.load(userId);
  },
  algSet: async (parent, { id }, { userId, mongo: { AlgSets } }) => {
    /* TODO: use loader. Do we need to handle ownership requirement then? */
    return await AlgSets.findOne({ _id: new ObjectId(id), createdById: userId });
  },
};
