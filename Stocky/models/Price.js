const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Price = new Schema({
    _id :{
        type : String,
        required : true
    },
    name: {
        type : String,
        reuired : true
    },
    price: {
        type : String,
        required : true
    }
}, {versionKey: false});

const pri = mongoose.model('Price', Price);
module.exports = pri;