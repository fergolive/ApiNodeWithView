class Item{
    constructor(file){
        this.fullname=null;
        this.name=null;
        this.extension=null;
        this.type=null;
        this.file=file;
        this.base64=null;

    }

    
    getFullName(){
        return this.file.name;
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
        // read binary data
        var bitmap = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        let b64str=new Buffer.from(bitmap).toString('base64');
        return b64str;
      }

      getNameWithOutExtension(fullname) {
        
        let indexPoint = fullname.lastIndexOf(".");
        let name = fullname.substr(0,indexPoint);
        return name;
      }

      async setDataItem(fullname){
        this.name = await this.getNameWithOutExtension(fullname)
        
        this.extension = await this.getExtension(fullname)
        
        this.base64= await this.base64_encode(this.file)
        
      }

      

}

module.exports = Item;