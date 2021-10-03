const express = require('express');
const app=express();
var fileupload = require('express-fileupload');
/* var cors=require('cors');

app.use(cors); */
app.use(fileupload());


//set routes
var my_routes = require('./routes/routes'); 
app.use('/api',my_routes)


//display web
app.use(express.static('public'));


//server settings
app.set('port',3000)

//listening the
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});