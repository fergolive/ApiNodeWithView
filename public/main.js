"use strict";


var api_url='http://localhost:3000/api'


function myFunction() {
    //document.getElementById("myIdButton").innerHTML = "Hello World";

  

fetch(api_url)
  .then(response => response.json())
  .then(data => {
   console.log(data);
  })
  .catch(console.error);

    
  }