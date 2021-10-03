var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


// Require controller modules.
var my_controller = require('../controllers/controller.js')

//routes

router.post('/',jsonParser, my_controller.my_function);




module.exports = router;