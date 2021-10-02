const express = require('express');

const app=express();

app.get('/',(req,res)=>{
    res.end('works')
});

express.listen(3000);