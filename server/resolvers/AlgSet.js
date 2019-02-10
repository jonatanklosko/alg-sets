module.exports = {
  id: (parent) => parent._id,
  createdBy: async (parent, args, { db, dataloaders: { userLoader } }) => {
    return await userLoader.load(parent.createdById);
  },
};
