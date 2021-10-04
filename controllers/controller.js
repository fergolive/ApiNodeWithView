//backend functions
 
var fileupload = require('express-fileupload');
const sharp = require('sharp');

exports.my_function = (req, res)=> {

    let fileU = req.files.files;
    
    let urlDest=`${__dirname}/tempfiles/${fileU.name}`;

        fileU.mv(urlDest, function(err, result) {

            //generate thumbnails
            //types: png, webp, jpeg, tiff, heif, raw
            sharp(urlDest).resize(250).png().toFile(`${__dirname}/tempfiles/thumbnail.png`)

     if(err) 
      throw err;
     res.send({success: true, message: "File uploaded!"
     });
    }) 
 

    
    
    
 
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


