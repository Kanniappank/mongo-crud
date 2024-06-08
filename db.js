const mongoose = require('mongoose')

let database;

async function getDatabase() {    
    // mongoose.connect('mongodb://localhost:27017/library')
    mongoose.connect('mongodb://localhost:27017/shop')
    .then(()=>console.log('connected to database'))
    .catch(()=> console.log('Not connected to database'))
}


module.exports = {
    getDatabase,
}