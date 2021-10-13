//backend functions

//var fileupload = require('express-fileupload');
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const fileItem=require("./item")


let fileName = "";
let onlyName='';
let urlDest; 
let item;

exports.genThumbnail = (req, res) => {

  try{
    
    let file = req.files.files; 
    item= new fileItem(file)

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
      
      item.setDirFullPath(newDirFile)
      file.mv(newDirFile,  (err, result)=> {
        
        createThumbnail(newDirFile)

       }); 
    }
    
  }
  catch(err){
    console.log(err);
  }
  
  
  function createThumbnail(pathFile){
    switch (item.type) {
      case 'image':
          newImageThumbnail();
        break;
      case 'video':
          newVideoThumbnail(pathFile);
        break;
    }
  }

  function newVideoThumbnail(){
      generateVideoThumbnail().then(()=>{
        let b64=item.base64_encode(`${item.getDirPath()}/thumb_${item.getName()}.png`)
        item.setBase64(b64)
      }).finally(()=>{
        console.log('base64 file saved');
        item.removeTempPath()
        console.log(item);
      })

  }

  function newImageThumbnail(){
    generateImageThumbnail()
  }
  
  
};

function createDir(){
  let newNameDir=new Date().getTime();
  var dir = __dirname + `/${newNameDir}`;
  item.setDirPath(dir)
  if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, 0744);
  }
  return dir;
}

function generateVideoThumbnail(){
  return new Promise((resolve,reject)=>{
        const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
        const ffmpeg = require('fluent-ffmpeg');
        ffmpeg.setFfmpegPath(ffmpegInstaller.path);
        // console.log(ffmpegInstaller.path, ffmpegInstaller.version);
        var pathToFile=item.getDirFullPath()
        var pathToSnapshot = item.getDirPath()
        var proc = ffmpeg(pathToFile)
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
        .takeScreenshots({ count: 1,filename:`thumb_${item.getName()}.png`, timemarks: [ '00:00:01.000' ], size: '250x?' },pathToSnapshot)
          .on('end', () => {
            console.log('thumb video done!')
            resolve()
          })
          .on('error', (err)=> {
            console.log('an error happened: ' + err.message);
            return reject(new Error(err))
          })   
    })      
}







function generateImageThumbnail() {
 
  let newUrlDest = item.getDirFullPath();
  try {
    sharp(newUrlDest)
      .resize(250)
      .png()
      .toBuffer()
      .then((data) => {
        const base64Data = data.toString("base64");
        item.setBase64(base64Data)
        console.log('base64 file saved');
        item.removeTempPath()
        
      });
  } catch (error) {
    console.log(error);
  }
}



function sendThumbnail(base64Data, res) {
  res.status(202).json({ b64Data: base64Data, extension: "png" });
}











