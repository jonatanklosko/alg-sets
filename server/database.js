const { MongoClient, Logger } = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'alg-sets-development';

const state = { db: null };

const initializeDb = async () => {
  const client = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true });
  Logger.setLevel('debug');
  Logger.filter('class', ['Cursor']);
  let counter = 1;
  Logger.setCurrentLogger((msg, context) => {
    console.log(`${counter++} ${msg}\n`);
  });
  state.db = client.db(DATABASE_NAME);
};

const getDb = () => {
  if (state.db === null) throw new Error('Database not initialized.');
  return state.db;
};

module.exports = { initializeDb, getDb };
