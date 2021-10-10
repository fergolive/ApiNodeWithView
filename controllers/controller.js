//backend functions

//var fileupload = require('express-fileupload');
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

let fileName = "";
let urlDest;


exports.genThumbnail = (req, res) => {
  let fileU = req.files.files; //file from frontend upload
  fileName = fileU.name;
  let result = getExtension(fileName);
  urlDest = `${__dirname}/tempfiles/${fileU.name}`; //temporal files folder
  urlDestPy = `${__dirname}/python_tools/video.mp4`
  //removeTempFiles();

  if (result.type === "image") {

    fileU.mv(urlDest, function (err, result) {
      createThumbnailForImage(res)
    }); //store file locally with mv function

  } else if (result.type === "video") {
   
    try{

      fileU.mv(urlDest, function (err, result) {
        const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
        const ffmpeg = require('fluent-ffmpeg');
        ffmpeg.setFfmpegPath(ffmpegInstaller.path);
        // console.log(ffmpegInstaller.path, ffmpegInstaller.version);
        var path = require('path'), // Default node module
        pathToFile = path.join(__dirname, 'tempfiles', fileName),
        pathToSnapshot = path.join(__dirname, 'tempfiles');

        var proc = ffmpeg(pathToFile)
        // setup event handlers
        .on('filenames', function(filenames) {
          console.log('screenshots are ' + filenames.join(', '));
        })
        .on('end', function() {
          console.log('screenshots were saved');
        })
        .on('error', function(err) {
          console.log('an error happened: ' + err.message);
        })
        // take 2 screenshots at predefined timemarks and size
        //.takeScreenshots({ count: 2, timemarks: [ '00:00:02.000', '6' ], size: '150x100' },pathToSnapshot);
        .takeScreenshots({ count: 2, timemarks: [ '00:00:01.000' ], size: '250x?' },pathToSnapshot);
      }); //store file locally with mv function

      

      
    
        
    }
    catch(err){
        console.log(err);
    }      

  }
};

function getExtension(fileName) {
  let result_extension = {};
  const images = ["jpg", "gif", "png"];
  const videos = ["mp4", "3gp", "ogg", "avi"];
  let indexPoint = fileName.lastIndexOf(".");
  let cantChar = fileName.length - 1;
  let rest = cantChar - indexPoint;
  let extension = fileName.substr(-1 * rest);
  if (images.includes(extension)) {
    result_extension = { type: "image", extension: extension };
  } else if (videos.includes(extension)) {
    result_extension = { type: "video", extension: extension };
  }
  return result_extension;
}

function createThumbnailForImage(res) {
  try {
    sharp(urlDest)
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
        console.log("thumb stored");
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

// res.json({recibido:'papa'})
exports.my_functionasdsd = (req, res) => {
  var myjsondata = [
    { name: "Ram", email: "Ram@gmail.com" },
    { name: "Bob", email: "bob32@gmail.com" },
  ];

  console.log(req.body);
  res.json(myjsondata);
};

exports.my_function_with_params = (req, res) => {
  res.send("hola mundo con parametros: " + req.params.id);
};
