module.exports = {
  id: (parent) => parent._id,
  createdBy: async (parent, args, { dataloaders: { userLoader } }) => {
    return await userLoader.load(parent.createdById);
  },
};
