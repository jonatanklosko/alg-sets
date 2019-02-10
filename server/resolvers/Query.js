module.exports = {
  me: async (parent, args, { userId, dataloaders: { userLoader } }) => {
    return await userLoader.load(userId);
  },
};
