const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId=mongodb.ObjectId;

let database;

async function getDatabase() {
    const client = await MongoClient.connect('mongodb://localhost:27017/'),
        // database = client.db('library'); //for books
        database = client.db('shop'); // for many to many
        if (!database) {
            console.log('database not connected')
        }
        return database;
}


module.exports = {
    getDatabase,
    ObjectId
}