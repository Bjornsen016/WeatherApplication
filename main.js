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
    url: "https://media0.giphy.com/media/EKpmZuydbsmRy/giphy.gif?cid=ecf05e47rx85450iutghyhy7nd1y7td8k47al5ti8fdmd026&rid=giphy.gif&ct=g",
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

document.getElementById("saved").addEventListener("click", (e) => {
  let target = e.target;

  if (target.tagName == "EM") {
    const dropdown = document.getElementById("dropdown");

    if (dropdown.style.display === "none") {
      dropdown.style.display = "flex";

      const submit = document.getElementById("submit");

      submit.addEventListener("click", (e) => {
        console.log("im running");
        const form = document.getElementById("city");
        addCity(form.value);
        form.parentElement.reset();
      });
    } else {
      dropdown.style.display = "none";
    }
  }

  if (target.tagName === "LI") {
    const city = target.innerText;
    console.log(city);
    // Kalla på funktionen som plockar fram vädret för staden
  }
});

document.getElementById("nav").addEventListener("click", (e) => {
  const choice = e.target.getAttribute("id");
  const clear = () => {
    document.getElementById("main").innerHTML = "";
  };

  switch (Number(choice)) {
    case 1:
      clear();
      weather.setBackground(renderNow, backgrounds);
      break;
    case 2:
      clear();
      weather.getHourly(renderToday);
      break;
    case 3:
      break;
  }
});

function addCity(city) {
  const target = document.getElementById("savedList");
  target.innerHTML += `<li>${city}</li>`;
}

function renderNow(background, type) {
  const main = document.getElementById("main");
  const statement = backgrounds.filter((item) => item.name === type)[0]
    ?.statement;

  main.innerHTML = `
  <div id="now">
    <div id="window"></div>
    <h1 id="nowText">${statement}</h1>
  </div>`;

  document.getElementById(
    "window"
  ).style.backgroundImage = `url('${background}')`;
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
        <h2>${Math.floor(item.temp - 273.15) + " Grader"}</h2>
        <img src="http://openweathermap.org/img/wn/${
          item.weather[0].icon
        }@2x.png" alt="${item.weather[0].description}" />
        <p>${item.weather[0].description}</p>
    </article> 
    `;
}

weather.setBackground(renderNow, backgrounds);
// weather.getHourly(renderToday);
