const express = require('express');
const app=express();
var router = express.Router();


var my_routes = require('./routes/routes'); 

//
app.use('/api',my_routes)

app.use(express.static('public'));





//settings
app.set('port',3000)

//listening the
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});