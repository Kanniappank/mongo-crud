const mongoose = require('mongoose')

let database;

async function getDatabase() {    
    mongoose.connect('mongodb://localhost:27017/library')
    .then(()=>console.log('connected to database'))
    .catch((err)=> console.log('Not connected to database',err))
}


module.exports = {
    getDatabase,
}