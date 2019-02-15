module.exports = {
  id: (parent) => parent._id,
  creator: async (parent, args, { dataloaders: { userLoader } }) => {
    return await userLoader.load(parent.creatorId);
  },
  stargazers: async (parent, args, { dataloaders: { usersByStarredAlgSetIdLoader } }) => {
    return await usersByStarredAlgSetIdLoader.load(parent._id);
  },
};
