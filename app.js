const express = require('express');

const app=express();

/* app.get('/',(req,res)=>{
    res.end('works')
}); */

app.use(express.static('public'));

const port=3000;

app.listen(port, ()=>{
    console.log('Servidor corriendo en el puerto ' +port);
});