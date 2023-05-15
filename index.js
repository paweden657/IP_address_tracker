const url = "http://localhost:5050/";

const form = document.getElementById("form");
const input = document.getElementById("input")

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const IpAddress = input.value;

  fetch(`${url}?param=${encodeURIComponent(IpAddress)}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
      console.error('error occured', error);
    });
})