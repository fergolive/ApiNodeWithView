class Item{
    constructor(fullname,name,ext,file){
        this.fullname=fullname;
        this.name=name;
        this.extension=ext;
        this.file=file;
        this.base64=null;
    }

    getName(){
        return this.name
    }

}