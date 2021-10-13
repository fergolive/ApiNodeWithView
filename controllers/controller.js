//backend functions

//var fileupload = require('express-fileupload');
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const fileItem=require("./item")


let fileName = "";
let onlyName='';
let urlDest; 


exports.genThumbnail = (req, res) => {

  try{
    
    let file = req.files.files; 
    let item= new fileItem(file)

    let fn=item.getFullName()
    if(fn) item.setFullName(fn)
    let woext=item.getNameWithOutExtension(fn)
    if(woext) item.setName(woext)
    let ext=item.getExtension(fn)
    if(ext){
      item.setExtension(ext.extension)
      item.setType(ext.type)
    } 

    let newDir = createDir()
    if (fs.existsSync(newDir)) {
      let newDirFile=`${newDir}/${item.getFullName()}`
      file.mv(newDirFile,  (err, result)=> {
        item.base64_encode()
       }); 
    }
    
  }
  catch(err){
    console.log(err);
  }
  

  
  
  //urlDest = `${__dirname}/tempfiles/${fileU.name}`; //temporal files folder
  //urlDestPy = `${__dirname}/python_tools/video.mp4`

  /* removeTempFiles();

  if (result.type === "image") {
    fileU.mv(urlDest, function (err, result) {
      createThumbnailForImage(res,fileName)
    }); //store file locally with mv function
  } else if (result.type === "video") {
    try{
      fileU.mv(urlDest, function (err, result) {
       createThumbnailForVideo(res).then(()=>{   
          //console.log(`${__dirname}/tempfiles/thumb_${onlyName}.png`);
          let base64Data= base64_encode(`${__dirname}/tempfiles/thumb_${onlyName}.png`);
          //console.log(`base64 image generated ${base64Data.substr(0,10)}...`);
          res.status(202).json({ b64Data: base64Data, extension: "png" });
        })
      }); //store file locally with mv function
    }
    catch(err){
        console.log(err);
    }      
  } */
};

function createDir(){
  let newNameDir=new Date().getTime();
  var dir = __dirname + `/${newNameDir}`;
  if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, 0744);
  }
  return dir;
}

function createThumbnailForVideo(){

  
  return new Promise((resolve,reject)=>{

        const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
        const ffmpeg = require('fluent-ffmpeg');
        ffmpeg.setFfmpegPath(ffmpegInstaller.path);
        // console.log(ffmpegInstaller.path, ffmpegInstaller.version);
        var path = require('path'); // Default node module
        var pathToFile = path.join(__dirname, 'tempfiles', fileName);
        var pathToSnapshot = path.join(__dirname, 'tempfiles');

        var proc = ffmpeg(pathToFile)
        // setup event handlers
        .on('filenames', (filenames)=> {
          console.log('screenshots are ' + filenames.join(', '));
        })
        .on('end', (data)=> {
          console.log('screenshots were saved');
          
        })
        .on('error', (err)=> {
          console.log('an error happened: ' + err.message);
          return reject(new Error(err))
        })
        // take 2 screenshots at predefined timemarks and size
        //.takeScreenshots({ count: 2, timemarks: [ '00:00:02.000', '6' ], size: '150x100' },pathToSnapshot);
        .takeScreenshots({ count: 1,filename:`thumb_${onlyName}.png`, timemarks: [ '00:00:01.000' ], size: '250x?' },pathToSnapshot)
          .on('end', () => {
            console.log('FFmpeg done!')
            resolve()
          })
          .on('error', (err)=> {
            console.log('an error happened: ' + err.message);
            return reject(new Error(err))
          })
          
    })

        
        
}







function createThumbnailForImage(res,nameFile) {
  let newUrlDest = `${__dirname}/tempfiles/${nameFile}`;
  try {
    sharp(newUrlDest)
      .resize(250)
      .png()
      .toBuffer()
      .then((data) => {
        const base64Data = data.toString("base64");

        res.status(202).json({ b64Data: base64Data, extension: "png" });
      });
  } catch (error) {
    console.log(error);
  }
}

function getFfmpegInstance() {
  return new this.FfmpegCommand({
    source: urlDest,
    logger: null,
  });
}




function sendThumbnail(base64Data, res) {
  res.status(202).json({ b64Data: base64Data, extension: "png" });
}



function storeThumbLocally() {
  try {
    //generate thumbnails
    //types: png, webp, jpeg, tiff, heif, raw
    sharp(urlDest)
      .resize(250)
      .png()
      .toFile(`${__dirname}/tempfiles/thumbnail.png`)
      .then((data) => {
       // console.log("thumb stored");
        //res.send(data);
        //res.send({success: true, message: "File uploaded!"});
      });
  } catch (error) {
    console.log(error);
  }
}

function removeTempFiles() {

  const directory = `${__dirname}/tempfiles/`;

  fs.readdir(directory, (err, files) => {
    files.forEach((element) => {
      fs.unlink(path.join(directory, element), (err) => {
        if (err) throw err;
      });
    });
  });

}





