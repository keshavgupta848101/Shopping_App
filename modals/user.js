const mongoose = require('mongoose');
const passportLocalMOngoose = require('passport-local-mongoose');
const Product = require('./product');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique:true
    },
    cart:[
            {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
            }
        ]  
})

userSchema.plugin(passportLocalMOngoose);

const User = mongoose.model('User', userSchema);

module.exports = User;