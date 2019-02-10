const DataLoader = require('dataloader');
const { getDb } = require('./database');

const batchUsers = async ids => {
  const users = await getDb().collection('users').find({ _id: { $in: ids } }).toArray();
  return ids.map(id => users.find(user => user._id.equals(id)));
};

module.exports = () => ({
  userLoader: new DataLoader(batchUsers, { cacheKeyFn: key => key.toString() })
});
