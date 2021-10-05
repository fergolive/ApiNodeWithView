//backend functions
 
//var fileupload = require('express-fileupload');
const sharp = require('sharp');
const fs = require('fs')
let fileName='';

exports.genThumbnail = (req, res)=> {

    let fileU = req.files.files;
    
    fileName=fileU.name;
    let urlDest=`${__dirname}/tempfiles/${fileU.name}`;

    let resp;

    //store file locally with mv function
    fileU.mv(urlDest, function(err, result) {
        //storeThumbLocally(urlDest,res);
         sendThumbToFront(urlDest,res)
         
         
    })

    //removeFile()
        
   
       

 
}  

function sendThumbToFront(urlOrig,res){
    try{
        sharp(urlOrig)
        .resize(250)
        .png()
        .toBuffer()
        .then(data=>{
            const base64Data = data.toString('base64');
            //return file to front in Base64 format
           
            res.status(202).json({ b64Data: base64Data, extension:'png'});
            
        })
    } catch(error){
        console.log(error);
    }
}

function storeThumbLocally(urlOrig,res){
    try{
        //generate thumbnails
        //types: png, webp, jpeg, tiff, heif, raw
        sharp(urlOrig)
        .resize(250)
        .png()
        .toFile(`${__dirname}/tempfiles/thumbnail.png`)
        .then((data) => {
            
            //res.send(data);
            res.send({success: true, message: "File uploaded!"});

            }); 
              
    } catch(error){
        console.log(error);
    }
}

function removeFile(){

    let filePath=`${__dirname}\\tempfiles\\${fileName}`

    try {
        fs.unlinkSync(filePath)
        
    } catch(error){
        console.log(error);
    }
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


