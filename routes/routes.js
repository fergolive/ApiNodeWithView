var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


// Require controller modules.
var my_controller = require('../controllers/controller.js')

//routes

router.put('/genthumb',jsonParser, my_controller.genThumbnail);




module.exports = router;