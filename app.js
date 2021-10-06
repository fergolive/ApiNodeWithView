const express = require('express');
const app=express();
var fileupload = require('express-fileupload');
const cors = require('cors');

app.use(cors({
    origin:['http://localhost:4200', 'http://localhost:4201']  //origin: ['https://www.section.io', 'https://www.google.com/']   origin: '*'
}));
//info cors -->
//https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/


app.use(fileupload());


//set routes
var my_routes = require('./routes/routes'); 
app.use('/api',my_routes)


//display web
app.use(express.static('public'));


//server settings
app.set('port',80)

//listening the
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});

