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
var app = express()

// Set the variables to use the bodyParse:
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Defining the port to run the API:
var port = process.env.port || 8000

// Creating a instance of the routes by Express:
var router = express.Router()

// Exemple routes:
router.get('/', function(req, res) {
    res.json({ message: 'Cool! Welcome to our app' })
})

// Setting a pattern of the prefixed routes: '/api':
app.use('/api', router)

// Starting the app (server):
app.listen(port)
console.log('App running on the port ' + port)
