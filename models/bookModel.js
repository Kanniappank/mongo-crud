const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    book: String,
    aurthor: String
})

const bookModel = mongoose.model('book', bookSchema)

module.exports = bookModel;



