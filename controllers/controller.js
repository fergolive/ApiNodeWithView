//backend functions
 
var fileupload = require('express-fileupload');
//const imageThumbnail = require('image-thumbnail');


exports.my_function = (req, res)=> {
   let fileU = req.files.files;
    
    let urlDest=`${__dirname}/tempfiles/${fileU.name}`;

     fileU.mv(urlDest, function(err, result) {
     if(err) 
      throw err;
     res.send({
      success: true,
      message: "File uploaded!"
     });
    }) 

    
    //let urlDestOpen=`${__dirname}\\tempfiles\\${fileU.name}`

    /* imageThumbnail(urlDestOpen)
    .then(thumbnail => { console.log(thumbnail) })
    .catch(err => console.error(err)); */

    /* file.mv(`${__dirname}/public/${file.name}`, (err,res) => {
        console.log(res)
        if (err) {
         return res.status(500).send(err);
        }
    
    }) */
}  


    
   // res.json({recibido:'papa'})


exports.my_functionasdsd = (req, res)=> {
    
    var myjsondata=[  
        {"name":"Ram", "email":"Ram@gmail.com"},  
        {"name":"Bob", "email":"bob32@gmail.com"}  
    ]  

    console.log(req.body);
    res.json(myjsondata)
};



exports.my_function_with_params = (req, res)=> {
    res.send('hola mundo con parametros: ' + req.params.id);
};
