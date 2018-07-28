/** 
 * 
 * File: server.js
 * Description:
 * Author: Daniel Manfred
 * Creation date: 21-july-2018
 * 
 */

// Set the setup of the app:

// Calls the packages:
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Product = require('./app/models/product')
var app = express()

// URI: Mlab
mongoose.connect('mongodb://manfred:lt1851@ds018268.mlab.com:18268/produkt', {
    useNewUrlParser: true
})

// Set the variables to use the bodyParse:
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Defining the port to run the API:
var port = process.env.port || 8000

// Creating a instance of the routes by Express:
var router = express.Router()

router.use(function(req, res, next) {
    console.log('Something happens here...')
    next()
})

// Exemple routes:
router.get('/', function(req, res) {
    res.json({ message: 'Cool! Welcome to our app' })
})

// Routes of the API
// ======================
router.route('/products').post(function(req, res) {
    var product = new Product()
    product.name = req.body.name
    product.price = req.body.price
    product.description = req.body.description

    product.save(function(error) {
        if (error) {
            res.send('Error while trying to save product: ' + error)
        }
        res.status(201).json('Product successfully registered')
    })
}).get(function(req, res) {
    Product.find(function(error, products) {
        if (error) {
            res.send('Error while trying to select all products: ' + error)
        }
        res.json(products)
    })
})

router.route('/products/:id').get(function(req, res) {
    Product.findById(req.params.id, function(error, product) {
        if (error) {
            res.send('Product id not found: ' + error)
        }
        res.json(product)
    })
}).put(function(req, res) {
    Product.findById(req.params.id, function(error, product) {
        if (error) {
            res.send('Product id not found: ' + error)
        }
        product.name = req.body.name
        product.price = req.body.price
        product.description = req.body.description

        product.save(function(error) {
            if (error) {
                res.send('Error updating product' + error)    
            }
            res.json('Product successfully updated')
        })
    })
}).delete(function(req, res) {
    Product.remove({ _id: req.params.id }, function(error) {
        if (error) {
            res.send('Product id not found: ' + error)
        }
        res.json({ message: 'Product successfully deleted!'})
    })
})

// Setting a pattern of the prefixed routes: '/api':
app.use('/api', router)

// Starting the app (server):
app.listen(port)
console.log('App running on the port ' + port)
