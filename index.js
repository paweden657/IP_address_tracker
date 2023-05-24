const url = "http://localhost:5050/";

const form = document.getElementById("form");
const input = document.getElementById("input");

let result = document.getElementById("result");
let notValidData = document.getElementById("not-valid-data");
let ipAddressP = document.getElementById("ip-address");
let locationP = document.getElementById("location");
let timeZoneP = document.getElementById("timezone");
let ispP = document.getElementById("isp");

let icon = L.icon ( {
  iconUrl: "images/icon-location.svg",
  iconSize: [46, 56],
  iconAnchor: [23, 56]
});

let lat = 41.9028;
let lng = 12.4964;

let map = L.map("map", {zoomControl: false}).setView([lat, lng], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors'}).addTo(map);

let marker = L.marker([lat, lng], {icon:icon}).addTo(map);

function setBaseMap(map, baseMap) {

  map.eachLayer((layer) => {
    if (layer instanceof L.TileLayer) {
      map.removeLayer(layer);
    }
  });

  if (baseMap === "map") {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: 'Map data &copy; OpenStreetMap contributors'}).addTo(map);
    } else {
      L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                  attribution: 'Map data &copy; <a href="https://www.google.com/maps">Google Maps</a>'}).addTo(map);
    }
}

var toggleViewControl = L.Control.extend({
  onAdd: function(map) {
    let container = L.DomUtil.create('div', 'toggle-view-control');
    
    let mapButton = L.DomUtil.create('button', 'view-button', container);
  
    mapButton.innerHTML = 'Map';

    mapButton.classList.add("clicked");

    L.DomEvent.on(mapButton, 'click', () => {
      satelliteButton.classList.remove("clicked");
      mapButton.classList.add("clicked");
      setBaseMap(map, "map");
    });
    
    let satelliteButton = L.DomUtil.create('button', 'view-button', container);

    satelliteButton.innerHTML = 'Satellite';

    L.DomEvent.on(satelliteButton, 'click', () => {
      mapButton.classList.remove("clicked");
      satelliteButton.classList.add("clicked");
      setBaseMap(map, "satellite");
    });

    return container;
  }
});

map.addControl(new toggleViewControl());

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const IpAddress = input.value;

  fetch(`${url}?param=${encodeURIComponent(IpAddress)}`)
    .then(response => {
      if(response.ok) {
        notValidData.classList.add("hide");
        return response.json();
      }
      else {
        console.log(response.status + ": " + response.statusText);
        result.classList.add("hide");
        notValidData.classList.remove("hide");
        map.removeLayer(marker);
        
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

        map.flyTo([lat, lng], 10, {
          duration: 2,
          easeLinearity: 0.25
        });

        map.removeLayer(marker);

        marker = L.marker([lat, lng], {icon:icon}).addTo(map);

        for(let i = 1; i <= 3; i++) {
          setTimeout(() => {
            map.setZoom(10 + 2 * i);
          }, 1500 * (i + 1));
        }
    })
    .catch(error => {
      console.error("Error occured", error);
    });
})