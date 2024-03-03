function updateTime() {
  //Groningen
  let groningenElement = document.querySelector("#groningen");
  if (groningenElement) {
    let groningenDateElement = groningenElement.querySelector(".date");
    let groningenTimeElement = groningenElement.querySelector(".time");
    let groningenTime = moment().tz("Europe/Amsterdam");

    groningenDateElement.innerHTML = groningenTime.format("MMMM Do YYYY");
    groningenTimeElement.innerHTML = groningenTime.format(
      "HH:mm:ss:SSS [<small>]A[</small>]"
    );
  }

  //Paris
  let parisElement = document.querySelector("#paris");
  if (parisElement) {
    let parisDateElement = parisElement.querySelector(".date");
    let parisTimeElement = parisElement.querySelector(".time");
    let parisTime = moment().tz("Europe/Paris");
    parisDateElement.innerHTML = parisTime.format("MMMM Do YYYY");
    parisTimeElement.innerHTML = parisTime.format(
      "HH:mm:ss:SSS [<small>]A[</small>]"
    );
  }
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `
  <div class="city"> 
  <div>
    <h2>${cityName}</h2>
    <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
    </div>
    <div class="time">${cityTime.format(
      "HH:mm:ss:SSS"
    )} <small>${cityTime.format("A")}</small></div>
    </div>
  `;
}

updateTime();
setInterval(updateTime, 1);

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
