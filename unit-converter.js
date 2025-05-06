function resultDisplay() {
  const fullResult = document.querySelector("#show-result").innerHTML;

  const match = fullResult.match(/=\s*(\d+\.?\d*)/);
  if (match && match[1]) {
    document.querySelector("#result-space").value = match[1];
  }
}

function convertLength(event) {
  event.preventDefault();

  let length = parseFloat(document.querySelector("#length").value);
  let fromUnit = document.querySelector("#from").value;
  let toUnit = document.querySelector("#to").value;

  let result = document.querySelector("#show-result");

  let resultPara = `<span class="result-span">Result:</span>  ${length} ${fromUnit}  = `;

  if (isNaN(length)) {
    result.innerHTML = "Please enter a valid unit.";
    result.style.color = "red";
    result.style.fontSize = "20px";
    document.querySelector("#length").style.border = "2px solid red";
    return;
  }

  if (fromUnit === "km") {
    result.innerHTML =
      toUnit === "miles"
        ? `${resultPara} ${(length / 1.6).toFixed(2)} miles`
        : toUnit === "ft"
        ? `${resultPara} ${(length * 3281).toFixed(2)} ft`
        : toUnit === "m"
        ? `${resultPara} ${(length * 1000).toFixed(2)} meters`
        : toUnit === "km"
        ? `${resultPara} ${length} km`
        : "Invalid conversion units.";

    resultDisplay();
  } else if (fromUnit === "miles") {
    result.innerHTML =
      toUnit === "km"
        ? `${resultPara} ${(length * 1.6).toFixed(2)} km`
        : toUnit === "ft"
        ? `${resultPara} ${(length * 5280).toFixed(2)} ft`
        : toUnit === "m"
        ? `${resultPara} ${(length * 1609).toFixed(2)} meters`
        : toUnit === "miles"
        ? `${resultPara} ${length} miles`
        : "Invalid conversion units.";

    resultDisplay();
  } else if (fromUnit === "ft") {
    result.innerHTML =
      toUnit === "km"
        ? `${resultPara} ${(length / 3281).toFixed(4)} km`
        : toUnit === "miles"
        ? `${resultPara} ${(length / 5280).toFixed(4)} miles`
        : toUnit === "m"
        ? `${resultPara} ${(length / 3.281).toFixed(4)} meters`
        : toUnit === "ft"
        ? `${resultPara} ${length} ft`
        : "Invalid conversion units.";

    resultDisplay();
  } else if (fromUnit === "m") {
    result.innerHTML =
      toUnit === "km"
        ? `${resultPara} ${(length / 1000).toFixed(4)} km`
        : toUnit === "miles"
        ? `${resultPara} ${(length / 1609).toFixed(4)} miles`
        : toUnit === "ft"
        ? `${resultPara} ${(length * 3.281).toFixed(4)} ft`
        : toUnit === "m"
        ? `${resultPara} ${length} meters`
        : "Invalid conversion units.";

    resultDisplay();
  } else {
    result.innerHTML = "Invalid conversion units.";
  }
}

document.querySelector("#convert").addEventListener("click", convertLength);

document.querySelector("#length").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    convertLength(event);
  }
});

function tempDisplay() {
  const fullResult = document.querySelector("#display-result").innerHTML;

  const match = fullResult.match(/=\s*(\d+\.?\d*)/);
  if (match && match[1]) {
    document.querySelector("#temp-result-space").value = match[1];
  }
}

function convertTemp(event) {
  event.preventDefault();

  let temp = parseFloat(document.querySelector("#temperature").value);
  let fromUnit = document.querySelector("#from-temp").value;
  let toUnit = document.querySelector("#to-temp").value;

  let result = document.querySelector("#display-result");

  let resultPara = `<span class="result-span">Result:</span> ${temp} ${fromUnit} = `;

  if (isNaN(temp)) {
    result.innerHTML = "Please enter a valid unit.";
    result.style.color = "red";
    result.style.fontSize = "20px";
    document.querySelector("#temperature").style.border = "2px solid red";
    return;
  }

  if (fromUnit === "C") {
    result.innerHTML =
      toUnit === "F"
        ? `${resultPara} ${((temp * 9) / 5 + 32).toFixed(2)} °F`
        : toUnit === "K"
        ? `${resultPara} ${(temp + 273.15).toFixed(2)} K`
        : toUnit === "C"
        ? `${resultPara} ${temp} °C`
        : "Invalid conversion units.";

    tempDisplay();
  } else if (fromUnit === "F") {
    result.innerHTML =
      toUnit === "C"
        ? `${resultPara} ${(((temp - 32) * 5) / 9).toFixed(2)} °C`
        : toUnit === "K"
        ? `${resultPara} ${(((temp - 32) * 5) / 9 + 273.15).toFixed(2)} K`
        : toUnit === "F"
        ? `${resultPara} ${temp} °F`
        : "Invalid conversion units.";

    tempDisplay();
  } else if (fromUnit === "K") {
    result.innerHTML =
      toUnit === "C"
        ? `${resultPara} ${(temp - 273.15).toFixed(2)} °C`
        : toUnit === "F"
        ? `${resultPara} ${(((temp - 273.15) * 9) / 5 + 32).toFixed(2)} °F`
        : toUnit === "K"
        ? `${resultPara} ${temp} K`
        : "Invalid conversion units.";

    tempDisplay();
  } else {
    result.innerHTML = "Invalid conversion units.";
  }
}

document.querySelector("#convert-temp").addEventListener("click", convertTemp);

document
  .querySelector("#temperature")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      convertTemp(event);
    }
  });

document.querySelector("#lengthconv").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".converter-section").style.display = "block";
  document.querySelector(".temperature-section").style.display = "none";
});

document.querySelector("#tempconv").addEventListener("click", function (e) {
  e.preventDefault();

  document.querySelector(".temperature-section").style.display = "block";
  document.querySelector(".converter-section").style.display = "none";
});

// weather function

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "f8b3dea5b6f8b60d46a38eb5eb884ec8";
  const resultBox = document.getElementById("weatherResult");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    resultBox.innerHTML = `
        <h3><i class="fas fa-map-marker-alt"></i> ${data.name}, ${data.sys.country}</h3>
        <p><i class="fas fa-thermometer-half"></i> Temp: ${data.main.temp}°C</p>
        <p><i class="fas fa-tint"></i> Humidity: ${data.main.humidity}%</p>
        <p><i class="fas fa-wind"></i> Wind: ${data.wind.speed} m/s</p>
        <p><i class="fas fa-cloud"></i> Weather: ${data.weather[0].main}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon"/>
      `;
  } catch (error) {
    resultBox.innerHTML = `<p style="color: red;"><i class="fas fa-exclamation-circle"></i> ${error.message}</p>`;
  }
}
