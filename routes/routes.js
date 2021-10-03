var express = require('express');
var router = express.Router();

// Require controller modules.
var my_controller = require('../controllers/controller.js')

//routes

router.get('/', my_controller.my_function);




module.exports = router;