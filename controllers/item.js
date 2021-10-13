const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const fileItem=require("./item")

class Item{
    constructor(file){
        this.fullname=null;
        this.name=null;
        this.extension=null;
        this.type=null;
        this.file=file;
        this.base64=null;
        this.dirPath=null;
        this.dirFullPath=null;
    }

    
    setFullName(name){
      this.fullname=name
    }
    getFullName(){
        return this.file.name;
    }

    

    setName(name){
      this.name=name
    }
    getName(){
      return this.name
    }

    setDirPath(dir){
      this.dirPath=dir
    }
    getDirPath(){
      return this.dirPath

    }

   

    setDirFullPath(dir){
      this.dirFullPath=dir
    }

    getDirFullPath(){
      return this.dirFullPath
    }

    

    setType(type){
      this.type=type
    }

    setExtension(ext){
      this.extension=ext
    }

    setBase64(b64){
      this.base64=b64
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

      base64_encode(file) {
        var bitmap = fs.readFileSync(file);
        let b64str=new Buffer.from(bitmap).toString('base64');
        return b64str;
      }

      getNameWithOutExtension(fullname) {
        
        let indexPoint = fullname.lastIndexOf(".");
        let name = fullname.substr(0,indexPoint);
        
        return name;
      }

      removeTempFiles() {

        const directory = `${__dirname}/tempfiles/`;
      
        fs.readdir(directory, (err, files) => {
          files.forEach((element) => {
            fs.unlink(path.join(directory, element), (err) => {
              if (err) throw err;
            });
          });
        });
      
      }

      removeTempPath() {

        fs.rm(this.getDirPath())
      
      }

      

      

}

module.exports = Item;