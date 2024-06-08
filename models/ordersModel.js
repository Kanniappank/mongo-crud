const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const customerSchema=new mongoose.Schema({
    name:String
})

const customerModel= mongoose.model('customers',customerSchema)


const ordersSchema = new mongoose.Schema({
    amount: Number,
    customer_Id: ObjectId,
    product_ids: [
        {
            type: ObjectId,
            ref: 'products'
        }
    ]
})

const orderModel = mongoose.model('orders', ordersSchema)
module.exports = orderModel