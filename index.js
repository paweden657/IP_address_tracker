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

let map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

let marker = L.marker([51.5, -0.09]).addTo(map);
