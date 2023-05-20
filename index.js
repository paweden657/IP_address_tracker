const url = "http://localhost:5050/";

const form = document.getElementById("form");
const input = document.getElementById("input");

let result = document.getElementById("result");
let ipAddressP = document.getElementById("ip-address");
let locationP = document.getElementById("location");
let timeZoneP = document.getElementById("timezone");
let ispP = document.getElementById("isp");

let icon = L.icon ( {
  iconUrl: "images/icon-location.svg"
});

let lat = 41.9028;
let lng = 12.4964;

let map = L.map("map", {zoomControl: false}).setView([lat, lng], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

let marker;

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const IpAddress = input.value;

  fetch(`${url}?param=${encodeURIComponent(IpAddress)}`)
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      else {
        console.log(response.status + ": " + response.statusText);
        throw new Error("Error occured");
      }
    })
    .then(data => {
        console.log(data);

        ipAddressP.innerHTML = data.ip;
        locationP.innerHTML = (data.location.region + ", " + data.location.city + " " + data.location.postalCode);
        timeZoneP.innerHTML = data.location.timezone;
        ispP.innerHTML = data.isp;

        result.classList.remove("hide");

        lat = data.location.lat;
        lng = data.location.lng;

        map.setView([lat, lng], 13);
        marker = L.marker([lat, lng], {icon:icon}).addTo(map);
    })
    .catch(error => {
      console.error("Error occured", error);
    });
})