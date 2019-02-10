const { MongoClient, Logger } = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'alg-sets-development';

module.exports = async () => {
  const client = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true });
  const db = client.db(DATABASE_NAME);
  let queryNumber = 1;
  Logger.setLevel('debug');
  Logger.filter('class', ['Cursor']);
  Logger.setCurrentLogger(message => {
    console.log(`${queryNumber++} ${message}\n`);
  });
  return {
    Users: db.collection('users'),
    AlgSets: db.collection('algSets'),
  };
};
