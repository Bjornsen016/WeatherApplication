import Weather from "./Weather.js";

const weather = new Weather();

const backgrounds = [
  {
    name: "Rain",
    url: "https://media4.giphy.com/media/xUPGcdhiQf2vbfDCyk/giphy.gif?cid=ecf05e47kf91tsmns5sp0y6ch6pv0twmxmq86ukz38atf009&rid=giphy.gif&ct=g",
    statement: "Just nu regnar det",
  },
  {
    name: "Snow",
    url: "https://media1.giphy.com/media/d3mlmtNPoxNrt4Bi/giphy.gif?cid=ecf05e470wuj51br6dtxnbzobljgfws7nibssishs4v0ghka&rid=giphy.gif&ct=g",
    statement: "Just nu snöar det",
  },
  {
    name: "Clouds",
    url: "https://media0.giphy.com/media/d5PPYjcb3caPTHM3hv/giphy.gif?cid=ecf05e47nrydepn9iphbq9ubjouhmz7s9qlav40iqzabmnss&rid=giphy.gif&ct=g",
    statement: "Just nu är det molnigt",
  },
  {
    name: "Clear",
    url: "https://media4.giphy.com/media/3o6wrFbvaNWm7z4kRG/giphy.gif?cid=ecf05e47p3rhd5a7my9vbudrb03h5208v17ckaw2fesseua5&rid=giphy.gif&ct=g",
    statement: "Just nu är det klart ute",
  },
  {
    name: "Drizzle",
    url: "https://cdn.dribbble.com/users/1951927/screenshots/5777363/drizzle-clouds-dribbble-dom-civiello1.gif",
    statement: "Just nu regnar det lite",
  },
  {
    name: "Thunderstorm",
    url: "https://media2.giphy.com/media/IcTPgN5cI0Ij464QCa/giphy.gif?cid=ecf05e47sm7tstf4ekxz09ynbyi8zon77003yhtky8ssnbdz&rid=giphy.gif&ct=g",
    statement: "Just nu råder oväder",
  },
];

const citys = [
  {
    city: "Göteborg",
    latitude: 57.70887,
    longitude: 11.97456,
  },
  {
    city: "Stockholm",
    latitude: 59.329323,
    longitude: 18.068581,
  },
  {
    city: "Malmö",
    latitude: 59.329323,
    longitude: 18.068581,
  },
];

document.getElementById("saved").addEventListener("click", (e) => {
  let target = e.target;

  if (target.tagName == "EM") {
    const dropdown = document.getElementById("dropdown");

    if (dropdown.style.display === "none") {
      dropdown.style.display = "flex";
    } else {
      dropdown.style.display = "none";
    }
  }

  if (target.tagName === "LI") {
    const city = target.innerText;
    const cityHeader = document.getElementById("city-header");
    cityHeader.innerText = target.innerText;
    // Kalla på funktionen som plockar fram vädret för staden
  }
});

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("im running");
  const form = document.getElementById("city");
  addCity(form.value);
  form.parentElement.reset();
});

document.getElementById("nav").addEventListener("click", (e) => {
  const choice = e.target.getAttribute("id");
  const cityHeader = document.getElementById("city-header");
  const clearMain = () => {
    document.getElementById("main").innerHTML = "";
  };

  switch (Number(choice)) {
    case 1:
      clearMain();
      cityHeader.innerText = "";
      weather.getWeather("current").then((data) => renderNow(data.current));
      break;
    case 2:
      clearMain();
      weather.getWeather("hourly").then((hourlyWeather) => {
        console.log(hourlyWeather);
        hourlyWeather.hourly.every((weather, index) => {
          if (index > 23) return false;
          if (index % 3 != 0) return true; //Only show every third hour

          renderToday(weather);
          return true;
        });
        weather.getCity().then((city) => {
          console.log(city);
          cityHeader.innerText = city;
        });
      });

      break;
    case 3:
      clearMain();
      weather.getWeather("daily").then((week) => {
        week.daily.forEach((day) => {
          renderDayCard(day);
        });
      });

      weather.getCity().then((city) => {
        const cityHeader = document.getElementById("city-header");
        console.log(city);
        cityHeader.innerText = city;
      });

      break;
  }
});

function addCity(city) {
  const target = document.getElementById("savedList");
  if (city !== "") target.innerHTML += `<li>${city}</li>`;
}

function renderNow(data) {
  const main = document.getElementById("main");
  const info = backgrounds.filter(
    (item) => item.name === data.weather[0].main
  )[0];

  main.innerHTML = `
  <div id="now">
    <div id="window">${Math.floor(data.temp) + "º"}</div>
    <h1 id="nowText">${info.statement}</h1>
  </div>`;

  document.getElementById(
    "window"
  ).style.backgroundImage = `url('${info.url}')`;
}

function renderToday(item) {
  let main = document.getElementById("main");
  let time = new Date(item.dt * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  main.innerHTML += `
    <article>
        <h1>${time}</h1>
        <h2>${Math.floor(item.temp) + " Grader"}</h2>
        <img src="http://openweathermap.org/img/wn/${
          item.weather[0].icon
        }@2x.png" alt="${item.weather[0].description}" />
        <p>${item.weather[0].description}</p>
    </article> 
    `;
}

function renderDayCard(item) {
  const main = document.getElementById("main");
  const t = new Date(item.dt * 1000);
  const days = [
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
    "Söndag",
  ];

  main.innerHTML += `
  <article>
    <h1>${days[t.getDay()]}<br>${t.toLocaleDateString()}</br></h1>
    <h2>${Math.floor(item.temp.day) + " Grader"}</h2>
    <img src="http://openweathermap.org/img/wn/${
      item.weather[0].icon
    }@2x.png" alt="${item.weather[0].description}" />
    <p>${item.weather[0].description}</p>
  </article> `;
}

weather.getWeather("current").then((data) => renderNow(data.current));
