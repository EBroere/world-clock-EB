function updateTime() {
  //Groningen
  let groningenElement = document.querySelector("#groningen");
  let groningenDateElement = groningenElement.querySelector(".date");
  let groningenTimeElement = groningenElement.querySelector(".time");
  let groningenTime = moment().tz("Europe/Amsterdam");

  groningenDateElement.innerHTML = groningenTime.format("MMMM Do YYYY");
  groningenTimeElement.innerHTML = groningenTime.format(
    "HH:mm:ss:SSS [<small>]A[</small>]"
  );

  //Paris
  let parisElement = document.querySelector("#paris");
  let parisDateElement = parisElement.querySelector(".date");
  let parisTimeElement = parisElement.querySelector(".time");
  let parisTime = moment().tz("Europe/Paris");

  parisDateElement.innerHTML = parisTime.format("MMMM Do YYYY");
  parisTimeElement.innerHTML = parisTime.format(
    "HH:mm:ss:SSS [<small>]A[</small>]"
  );
}
updateTime();
setInterval(updateTime, 1);
