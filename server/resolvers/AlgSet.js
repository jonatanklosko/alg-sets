module.exports = {
  id: (parent) => parent._id,
  owner: async (parent, args, { dataloaders: { userLoader } }) => {
    return await userLoader.load(parent.ownerId);
  },
  stargazers: async (parent, args, { dataloaders: { usersByStarredAlgSetIdLoader } }) => {
    return await usersByStarredAlgSetIdLoader.load(parent._id);
  },
};
