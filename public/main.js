"use strict";

var api_url = "http://localhost:3000/api/";

function myFunction() {
  fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch(console.error);
}

function sendData() {


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
