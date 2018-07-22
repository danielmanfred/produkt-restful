/**
 * File: product.js
 * Author: Daniel Manfred
 * Description: Model responsible for the product class
 * Date: 21-july-2018
 */

var mongoose = require('mongoose')

var Schema = mongoose.Schema

var product = new Schema({
    name: String,
    price: Number,
    description: String
})

module.exports = mongoose.model('Product', product)