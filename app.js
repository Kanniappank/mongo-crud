const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const exhb = require('express-handlebars');
const dbo = require('./db');
const BookModel = require('./models/bookModel');
const bookModel = require('./models/bookModel');
const orderModel = require('./models/ordersModel')
require('./models/productModel')

dbo.getDatabase();

app.engine('hbs', exhb.engine(
    {
        layoutsDir: 'views/', defaultLayout: 'main', extname: "hbs",
        runtimeOptions: {
            allowProtoMethodsByDefault: true,
            allowProtoPropertiesByDefault: true
        }
    }
))
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    let books = await BookModel.find({})

    let message = '';
    let edit_id, edit_book
    if (req.query.edit_id) {
        edit_id = req.query.edit_id;
        edit_book = await BookModel.findOne({ _id: edit_id })
    }
    if (req.query.delete_id) {
        await BookModel.deleteOne({ _id: req.query.delete_id })
        return res.redirect('/?status=3');

    }
    if (req.query.status == 1) {
        message = 'Inserted successfully'
    }
    else if (req.query.status == 2) {
        message = 'Updated Successfully';

    }
    else if (req.query.status == 3) {
        message = 'Deleted Successfully';

    }
    res.render('main', { message, books, edit_id, edit_book })
})

app.post('/store_book', async (req, res) => {
    const book = new BookModel({ book: req.body.title, aurthor: req.body.author });
    book.save();
    return res.redirect('/?status=1');
})

app.post('/update_book/:edit_id', async (req, res) => {
    let edit_id = req.params.edit_id
    await bookModel.findOneAndUpdate({ _id: edit_id }, { book: req.body.title, aurthor: req.body.author })
    return res.redirect('/?status=2');
})

app.get('/many-to-many', async (req, res) => {
    const orders = await orderModel.find()
    console.log('orders', orders);

})



app.listen(8000, () => { console.log('listening to port 8000') })