const express = require('express');
const app=express();

//settings
app.set('port',3000)



app.use(express.static('public'));


/* //routes
const fileRoute= require("./routes/file");
app.use("/upfile",fileRoute) */

//listening the
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});