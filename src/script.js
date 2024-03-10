// Analog clock

setInterval(setClocks, 1000);

const timezones = ["Europe/Amsterdam"];

function setClocks() {
  timezones.forEach((timezone, index) => {
    const clock = document.querySelectorAll(".clock")[index];
    setClock(clock, timezone);
  });
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
  //Groningen
  let groningenElement = document.querySelector("#groningen");
  if (groningenElement) {
    let groningenDateElement = groningenElement.querySelector(".date");
    let groningenTimeElement = groningenElement.querySelector(".time");
    let groningenTime = moment().tz("Europe/Amsterdam");

    groningenDateElement.innerHTML = groningenTime.format("MMMM Do YYYY");
    groningenTimeElement.innerHTML = groningenTime.format(
      "HH:mm:ss [<small>]A[</small>]"
    );
  }
}

//Timezone digital clock
function updateCity(event) {
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
setInterval(updateTime, 1);

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
