import Weather from "./Weather.js";

const weather = new Weather();
const backgrounds = [
  {
    name: "Rain",
    url: "https://media4.giphy.com/media/xUPGcdhiQf2vbfDCyk/giphy.gif?cid=ecf05e47kf91tsmns5sp0y6ch6pv0twmxmq86ukz38atf009&rid=giphy.gif&ct=g",
  },
  {
    name: "Snow",
    url: "https://media1.giphy.com/media/d3mlmtNPoxNrt4Bi/giphy.gif?cid=ecf05e470wuj51br6dtxnbzobljgfws7nibssishs4v0ghka&rid=giphy.gif&ct=g",
  },
  {
    name: "Clouds",
    url: "https://media0.giphy.com/media/d5PPYjcb3caPTHM3hv/giphy.gif?cid=ecf05e47nrydepn9iphbq9ubjouhmz7s9qlav40iqzabmnss&rid=giphy.gif&ct=g",
  },
  {
    name: "Clear",
    url: "https://media0.giphy.com/media/EKpmZuydbsmRy/giphy.gif?cid=ecf05e47rx85450iutghyhy7nd1y7td8k47al5ti8fdmd026&rid=giphy.gif&ct=g",
  },
  {
    name: "Drizzle",
    url: "https://cdn.dribbble.com/users/1951927/screenshots/5777363/drizzle-clouds-dribbble-dom-civiello1.gif",
  },
  {
    name: "Thunderstorm",
    url: "https://media2.giphy.com/media/IcTPgN5cI0Ij464QCa/giphy.gif?cid=ecf05e47sm7tstf4ekxz09ynbyi8zon77003yhtky8ssnbdz&rid=giphy.gif&ct=g",
  },
];

document.getElementById("nav").addEventListener("click", (e) => {
  toggle(e.target.getAttribute("id"));
});

function renderNow(background, type) {
  let targetWindow = document.getElementById("window");
  let targetText = document.getElementById("nowText");
  targetWindow.style.backgroundImage = `url(${background})`;

  switch (type) {
    case "Rain":
      targetText.innerText = "Just nu regnar det";
      break;

    case "Snow":
      targetText.innerText = "Just nu snöar det";
      break;

    case "Clouds":
      targetText.innerText = "Just nu är det molnigt";
      break;

    case "Clear":
      targetText.innerText = "Just nu är det klart ute";
      break;

    case "Drizzle":
      targetText.innerText = "Just nu regnar det lite";
      break;

    case "Thunderstorm":
      targetText.innerText = "Just nu råder oväder";
      break;
  }
}

function renderToday(item) {
  let main = document.getElementById("main");
  let time = new Date(item.dt * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  todayDiv.innerHTML += `
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
weather.getHourly(renderToday);
