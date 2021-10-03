"use strict";


var api_url = "http://localhost:3000/api/";

function asdasd() {
  fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch(console.error);
}

let uploadFile = ()=>{
   
  var input = document.querySelector('input[type="file"]')

  var data = new FormData()
  for (const file of input.files) {
    data.append('files',file,file.name)
  }
  
  this.doupload2(data)

  }  



const doupload = (file) => {
  fetch(api_url, { // Your POST endpoint
    method: 'POST',
    headers: {
      // Content-Type may need to be completely **omitted**
      // or you may need something
      "Content-Type": "You will perhaps need to define a content-type here"
    },
    body: file // This is your file object
  }).then(
    response => response.json() // if the response is a JSON object
  ).then(
    success => console.log(success) // Handle the success response object
  ).catch(
    error => console.log(error) // Handle the error response object
  );
};

function doupload2(data) {
  

  fetch("http://localhost:3000/api/", {
    method: 'PUT',
    body: data
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
}

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
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));


}




