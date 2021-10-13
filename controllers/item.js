const fs = require("fs");

class Item {
  constructor(file) {
    this.fullname = null;
    this.name = null;
    this.extension = null;
    this.type = null;
    this.file = file;
    this.base64 = null;
    this.dirPath = null;
    this.dirFullPath = null;
  }

  //Fullname
  setFullName(name) {
    this.fullname = name;
  }
  getFullName() {
    return this.file.name;
  }

  //Name
  setName(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }

  //DitPath
  setDirPath(dir) {
    this.dirPath = dir;
  }
  getDirPath() {
    return this.dirPath;
  }

  //DirFullPath
  setDirFullPath(dir) {
    this.dirFullPath = dir;
  }
  getDirFullPath() {
    return this.dirFullPath;
  }

  //Type
  setType(type) {
    this.type = type;
  }
  getType() {
    return this.type;
  }

  //Base 64
  setBase64(b64) {
    this.base64 = b64;
  }
  getBase64() {
    return this.base64;
  }
  base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    let b64str = new Buffer.from(bitmap).toString("base64");
    return b64str;
  }

  //Extension
  setExtension(ext) {
    this.extension = ext;
  }
  getExtension(fullname) {
    let result_extension = {};
    const images = ["jpg", "gif", "png"];
    const videos = ["mp4", "3gp", "ogg", "avi"];
    let indexPoint = fullname.lastIndexOf(".");
    let cantChar = fullname.length - 1;
    let rest = cantChar - indexPoint;
    let extension = fullname.substr(-1 * rest);
    if (images.includes(extension)) {
      result_extension = { type: "image", extension: extension };
    } else if (videos.includes(extension)) {
      result_extension = { type: "video", extension: extension };
    }

    return result_extension;
  }

  getNameWithoutExtension(fullname) {
    let indexPoint = fullname.lastIndexOf(".");
    let name = fullname.substr(0, indexPoint);
    return name;
  }

  removeTempPath() {
    let dir = this.dirPath;
    fs.rm(dir, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  createDir() {
    let newNameDir = new Date().getTime();
    var dir = __dirname + `/${newNameDir}`;
    this.setDirPath(dir);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    return dir;
  }
}

module.exports = Item;
