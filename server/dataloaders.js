const DataLoader = require('dataloader');

const batchUsers = async (Users, ids) => {
  const users = await Users.find({ _id: { $in: ids } }).toArray();
  return ids.map(id => users.find(user => user._id.equals(id)));
};

const batchAlgSets = async (AlgSets, ids) => {
  const algSets = await AlgSets.find({ _id: { $in: ids } }).toArray();
  return ids.map(id => algSets.find(algSet => algSet._id.equals(id)));
};

const batchUsersByStarredId = async (Users, starredIds) => {
  const users = await Users.find({ starredAlgSetIds: { $in: starredIds } }).toArray();
  return starredIds.map(starredId =>
    users.filter(user =>
      user.starredAlgSetIds.some(starredAlgSetId => starredAlgSetId.equals(starredId))
    )
  );
};

module.exports = ({ Users, AlgSets }) => ({
  userLoader: new DataLoader(ids => batchUsers(Users, ids), { cacheKeyFn: key => key.toString() }),
  algSetLoader: new DataLoader(ids => batchAlgSets(AlgSets, ids), { cacheKeyFn: key => key.toString() }),
  usersByStarredAlgSetIdLoader: new DataLoader(ids => batchUsersByStarredId(Users, ids), { cacheKeyFn: key => key.toString() }),
});
