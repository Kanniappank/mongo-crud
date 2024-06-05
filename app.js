const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const exhb = require('express-handlebars');
const dbo = require('./db');
const { MongoClient } = require('mongodb');
const ObjectId = dbo.ObjectId;

app.engine('hbs', exhb.engine({ layoutsDir: 'views/', defaultLayout: 'main', extname: "hbs" }))
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    const cursor = collection.find({});
    let books = await cursor.toArray();
    let message = '';
    let edit_id, edit_book
    if (req.query.edit_id) {
        edit_id = req.query.edit_id;
        edit_book = await collection.findOne({ _id: ObjectId(edit_id) })
    }
    if (req.query.delete_id) {
        await collection.deleteOne({ _id: ObjectId(req.query.delete_id) })
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
    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    let book = { book: req.body.title, aurthor: req.body.author }
    const cursor = await collection.insertOne(book)
    return res.redirect('/?status=1');
})

app.post('/update_book/:edit_id', async (req, res) => {
    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    let book = { book: req.body.title, aurthor: req.body.author }
    let edit_id = req.params.edit_id
    const cursor = await collection.updateOne({ _id: ObjectId(edit_id) }, { $set: book })
    return res.redirect('/?status=2');
})

app.get('/many-to-many', async (req, res) => {
    let database = await dbo.getDatabase();
    const collection = database.collection('orders');
    let orders = await collection.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "product_ids",
                foreignField: "_id",
                as: "products"
            }
        }
    ]).toArray();

    console.log('order', JSON.stringify(orders));
})


app.listen(8000, () => { console.log('listening to port 8000') })