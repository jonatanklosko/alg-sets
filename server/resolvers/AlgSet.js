module.exports = {
  id: (parent) => parent._id,
  createdBy: async (parent, args, { dataloaders: { userLoader } }) => {
    return await userLoader.load(parent.createdById);
  },
  stargazers: async (parent, args, { mongo: { Users } }) => {
    return await Users.find({ starredAlgSetIds: parent._id }).toArray();
  },
};
