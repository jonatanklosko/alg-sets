module.exports = {
  me: async (parent, args, { db, userId, dataloaders: { userLoader } }) => {
    return await userLoader.load(userId);
  },
};
