const url = "http://localhost:5050/";

const form = document.getElementById("form");
const input = document.getElementById("input")

let notValidIp = document.getElementById("not-valid-ip");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const IpAddress = input.value;


  fetch(`${url}?param=${encodeURIComponent(IpAddress)}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.Answer === "Address is valid") {
          notValidIp.classList.add("hide");
        } else {
          notValidIp.classList.remove("hide");
        }
    })
    .catch(error => {
      console.error('error occured', error);
    });
})