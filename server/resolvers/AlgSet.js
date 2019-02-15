module.exports = {
  id: (parent) => parent._id,
  creator: async (parent, args, { dataloaders: { userLoader } }) => {
    return await userLoader.load(parent.creatorId);
  },
  stargazers: async (parent, args, { mongo: { Users } }) => {
    return await Users.find({ starredAlgSetIds: parent._id }).toArray();
  },
};
