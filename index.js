// Function to create html elements
let create = (type, className, id) => {
  let element = document.createElement(type);
  element.className = className;
  element.id = id;
  return element;
};

let url = "https://restcountries.com/v3.1/all";

let fetchItems = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    console.log(response.status);
    resstatus = response.status;
    throw new Error(`Error! status: ${response.status}`);
  }
};

// MFetch url for contries
fetchItems(url)
  .then((countryList) => fetchSuccess(countryList))
  .catch((error) => console.log(error));

let rootdiv = create("div", "countryList", "root");
document.body.append(rootdiv);

function fetchSuccess(data) {
  data.forEach((country) => {
    let card = create("div", "card col-lg-2 col-sm-6", "card");

    //card-head
    let cardHeader = create("div", "card-header", "card-header");

    let headerText = create("h3", "cardText", "headerText");
    headerText.innerText = `${country.name.common}`;
    cardHeader.append(headerText);

    let cardBody = create("div", "card-body", "card-body");
    let flagImage = document.createElement("img");
    flagImage.setAttribute("src", `${country.flags.svg}`);

    let capital = create("p", "capital", "capital");
    capital.innerHTML = "<b>Capital : </b>" + country.capital;

    let continent = create("p", "continent", "continent");
    continent.innerHTML = "<b>Continent : </b>" + country.region;

    let code = create("p", "code", "code");
    code.innerHTML = "<b>Country Code : </b>" + country.cca3;

    let coordinates = country.latlng;

    let weatherButton = create(
      "button",
      "btn btn-outline-primary",
      "weatherbtn",
    );
    weatherButton.innerText = "Current weather";
    weatherButton.addEventListener("click", function () {
      getWeather(coordinates, weatherDetails);
    });

    let weatherDetails = create("p", "weathernow", "weather-details");

    cardBody.append(flagImage, capital, continent, code);
    card.append(cardHeader, cardBody, weatherButton, weatherDetails);

    rootdiv.append(card);
  });
}

// fetch for weather data from openweather

async function getWeather(location, weather) {
  let apiKey = "b014ba2d43d98f413a0fe36da15679c4";

  let lat = Math.round(location[0]);
  let long = Math.round(location[1]);

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

  let result = await fetch(url);
  let data = await result.json();

  weather.innerHTML = "<b>Weather: </b>" +data.weather[0].description;
}


