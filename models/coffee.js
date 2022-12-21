//////////////////////////////////////////////
//////// 
///////////////////////////////////////////////
const { urlencoded } = require("express")
const mongoose = require('./connection')

const { Schema, model } = mongoose // destructuring, grabbing model and Schema off mongoose variable
// mongoose.Schema
// mongoose.model


const coffeeSchema = new  Schema({
    name: String,
    bean: String,
    expressoShot: Boolean,
    flavor: String,
    sugar: String,
    iced: Boolean,
    size: String,

})

const Coffee = model('Coffee', coffeeSchema)

module.exports = Coffee

