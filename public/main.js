"use strict";


var api_url = "http://localhost:3000/api/";
//const b64toBlob=require('b64-to-blob')


let uploadFile = ()=>{
  var input = document.querySelector('input[type="file"]')
  var data = new FormData()
  for (const file of input.files) {
    data.append('files',file,file.name)
  }
  this.doupload2(data)
}  


function doupload2(data) {

  fetch("http://localhost:3000/api/genthumb", {
    method: 'PUT',
    body: data
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
    
    console.log(response);

    const base64_response = String(response['b64Data'])
    
    //show image in html
    var image = new Image();
    image.onload = function(){
      console.log(image.width); // image is loaded and we have image width 
    }
    image.src = 'data:image/png;base64,'+base64_response;
    document.body.appendChild(image);

    
    var a = document.createElement("a"); //Create <a>
    a.href = "data:image/png;base64," + base64_response; //Image Base64 Goes here
    a.download = "Image.png"; //File name Here
    a.click(); //Downloaded file
    a.remove();

});
}


/* 
function myFunction() {


  var url = "http://localhost:3000/api/";
  var data = { username: "example" };

  fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      res.json()
    })  
    .catch((error) => console.error("Error:", error))
    .then((response) => {

      //const blob = b64toBlob(data.b64Data, data.contentType);
      console.log(blob);

      //console.log("Success:", response)
  }); */


}




