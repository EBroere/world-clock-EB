// Analog clock

setInterval(setClocks, 1000);

let selectedTimezone = "Europe/Amsterdam"; // Default timezone

function setClocks() {
  const clock = document.querySelector(".clock");
  setClock(clock, selectedTimezone);
}

function setClock(clock, timezone) {
  const hourHand = clock.querySelector("[data-hour-hand]");
  const minuteHand = clock.querySelector("[data-minute-hand]");
  const secondHand = clock.querySelector("[data-second-hand]");

  const currentDate = moment().tz(timezone);

  const secondsRatio = currentDate.seconds() / 60;
  const minutesRatio = (secondsRatio + currentDate.minutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.hours()) / 12;
  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);

}

function setRotation(element, rotationRatio) {
  element.style.setProperty("--rotation", rotationRatio * 360);
}

setClocks();

// Digital clock

function updateTime() {
  let groningenElement = document.querySelector("#groningen");
  if (groningenElement) {
    let groningenDateElement = groningenElement.querySelector(".date");
    let groningenTimeElement = groningenElement.querySelector(".time");
    let groningenTime = moment().tz(selectedTimezone);

    groningenDateElement.innerHTML = groningenTime.format("MMMM Do YYYY");
    groningenTimeElement.innerHTML = groningenTime.format(
      "HH:mm:ss [<small>]A[</small>]"
    );
  }
}

//Update both clocks
function updateCity(event) {
  selectedTimezone = event.target.value;
  updateTime();
  setClocks();

  //Update city

  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `
  <div class="city"> 
  <div>
    <h2>${cityName}</h2>
    <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
    </div>
    <div class="time">${cityTime.format("HH:mm:ss")} <small>${cityTime.format(
    "A"
  )}</small></div>
    </div>
  `;
}

updateTime();
setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
