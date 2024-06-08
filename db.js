const mongoose = require('mongoose')

let database;

async function getDatabase() {    
    // mongoose.connect('mongodb://localhost:27017/library')
    mongoose.connect('mongodb+srv://suriyastart007:v3ERWDKwFukUUWqZ@cluster0.0nefcyt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>console.log('connected to database'))
    .catch((err)=> console.log('Not connected to database',err))
}


module.exports = {
    getDatabase,
}