const url = "http://localhost:5050/";

const form = document.getElementById("form");
const input = document.getElementById("input")

let notValidIp = document.getElementById("not-valid-ip");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const IpAddress = input.value;

  fetch(`${url}?param=${encodeURIComponent(IpAddress)}`)
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        if(response.status === 400) {
          notValidIp.classList.remove("hide");
        }
        throw new Error("Error occured:" + response.status);
      }
    })
    .then(data => {
        console.clear();
        console.log(data);
        notValidIp.classList.add("hide");
    })
    .catch(error => {
      console.error('Error occured', error);
    });
})