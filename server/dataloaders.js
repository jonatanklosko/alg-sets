const DataLoader = require('dataloader');

const batchUsers = async (Users, ids) => {
  const users = await Users.find({ _id: { $in: ids } }).toArray();
  return ids.map(id => users.find(user => user._id.equals(id)));
};

module.exports = ({ Users }) => ({
  userLoader: new DataLoader(ids => batchUsers(Users, ids), { cacheKeyFn: key => key.toString() }),
});
