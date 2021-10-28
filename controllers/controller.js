const sharp = require("sharp");
const fs = require("fs");
const fileItem = require("./item");
let item;
let res=null;



exports.genThumbnail = (req, res) => {

  try {
    res=res
    let file = req.files.files;
    item = new fileItem(file);
    let fn = file.name;
    if (fn) item.setFullName(fn);
    let woext = item.getNameWithoutExtension(fn);
    if (woext) item.setName(woext);
    let ext = item.getExtension(fn);
    if (ext) {
      item.setExtension(ext.extension);
      item.setType(ext.type);
    }
    let newDir = item.createDir();
    if (fs.existsSync(newDir)) {
      let newDirFile = `${newDir}/${item.getFullName()}`;
      item.setDirFullPath(newDirFile);

       file.mv(newDirFile, (err, result) => {

        createThumbnail(newDirFile);

      }); 
    }
  } catch (err) {
    console.log('Erro 1');
    sendError(err)
  }



function createThumbnail() {
  switch (item.type) {
    case "image":
      console.log('image');
      newImageThumbnail();
      break;
    case "video":
      console.log('video');
      newVideoThumbnail();
      break;
  }
}

function newVideoThumbnail() {
  console.log('new video section');
  generateVideoThumbnail()
    .then(() => {
      
      let b64 = item.base64_encode(
        `${item.getDirPath()}/thumb_${item.getName()}.png`
      );
      item.setBase64(b64);
    })
    .finally(() => {
      console.log("base64 video created!");
      item.removeTempPath();
      sendThumbnailToFront()
    });
}

function newImageThumbnail() {
  let newUrlDest = item.getDirFullPath();
  try {
    sharp(newUrlDest)
      .resize(250)
      .png()
      .toBuffer()
      .then((data) => {
        const base64Data = data.toString("base64");
        item.setBase64(base64Data);
        console.log("base64 image created!");
        item.removeTempPath();
        sendThumbnailToFront()
      });
  } catch (error) {
    console.log(error);
  }
}

function generateVideoThumbnail() {
  return new Promise((resolve, reject) => {
    const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
    const ffmpeg = require("fluent-ffmpeg");
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);
    // console.log(ffmpegInstaller.path, ffmpegInstaller.version);
    var pathToFile = item.getDirFullPath();
    var pathToSnapshot = item.getDirPath();
    var proc = ffmpeg(pathToFile)
      .on("filenames", (filenames) => {
        console.log("screenshots are " + filenames.join(", "));
      })
      .on("end", (data) => {
        console.log("screenshots were saved");
      })
      .on("error", (err) => {
        console.log("an error happened: " + err.message);
        return reject(new Error(err));
      })
      // take 2 screenshots at predefined timemarks and size
      //.takeScreenshots({ count: 2, timemarks: [ '00:00:02.000', '6' ], size: '150x100' },pathToSnapshot);
      .takeScreenshots(
        {
          count: 1,
          filename: `thumb_${item.getName()}.png`,
          timemarks: ["00:00:01.000"],
          size: "250x?",
        },
        pathToSnapshot
      )
      .on("end", () => {
        console.log("thumb video done!");
        resolve();
      })
      .on("error", (err) => {
        console.log("an error happened: " + err.message);
        return reject(new Error(err));
      });
  });
}


function sendThumbnailToFront() {
  res.status(202).json({ state:'ok',item:item });
}

function sendError(error){
  res.status().json({error:error})
}

};
