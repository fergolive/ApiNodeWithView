//backend functions
 
//var fileupload = require('express-fileupload');
const sharp = require('sharp');
const fs = require('fs')
const path = require('path');

let fileName='';
let urlDest;


exports.genThumbnail = (req, res)=> {
    
    let fileU = req.files.files; //file from frontend upload
    fileName=fileU.name;
    urlDest=`${__dirname}/tempfiles/${fileU.name}`; //temporal files folder
    
    removeTempFiles()
    fileU.mv(urlDest, function(err, result) {
        createThumbnail(res)
    }) //store file locally with mv function
      
    
}  

/* async function main(res){
    
    await createThumbnail()
    //await sendThumbnail(fileB64,res)

    //await storeThumbLocally() //if you need save a thumb in server
    
} */



function createThumbnail(res){
    try{
        sharp(urlDest)
        .resize(250)
        .png()
        .toBuffer()
        .then(data=>{
            const base64Data = data.toString('base64');
           
            res.status(202).json({ b64Data: base64Data, extension:'png'});
        })
    } catch(error){
        console.log(error);
    }
}

function sendThumbnail(base64Data,res){
    res.status(202).json({ b64Data: base64Data, extension:'png'});
}

function storeThumbLocally(){
    try{
        //generate thumbnails
        //types: png, webp, jpeg, tiff, heif, raw
        sharp(urlDest)
        .resize(250)
        .png()
        .toFile(`${__dirname}/tempfiles/thumbnail.png`)
        .then((data) => {
            console.log('thumb stored');
            //res.send(data);
            //res.send({success: true, message: "File uploaded!"});

            }); 
              
    } catch(error){
        console.log(error);
    }
}

function removeTempFiles(){

    const directory=`${__dirname}\\tempfiles`

   
     fs.readdir(directory, (err, files) => {
        if(Array.isArray(files) && files.length){
            console.log('borrando archivos...');
            for (const file of files) {
                console.log(file);
                fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
                });
            }
        }

    });
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


