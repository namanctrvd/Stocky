const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uls = new Schema({
    username: {
        type : String,
        reuired : true
    },
    password: {
        type : String,
        required : true
    },
    gameid : {
        type : String,
        required : true
    },
    stqy : {
        type : Array,
        required : false,
        minItems : 50,
        maxItems : 50
    },
    cash : {
        type : Number,
        required : false
    },
    ip :{
        type : String,
        required : false
    }

});

const Uls = mongoose.model('Uls', uls);
module.exports = Uls;