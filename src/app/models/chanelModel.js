const mongoose = require('mongoose')
const messSchema = require('./messagerModel')
const userSchema = require('./userModel.js')

const chanelSchema = new mongoose.Schema({
    chanelId:{
        type: mongoose.Schema.Types.ObjectId,        
        required: true
    },
    userId:{
        type: Number,
        ref:'Users',
        required: true
    },      
})

module.exports = mongoose.model('Chanel',chanelSchema);
