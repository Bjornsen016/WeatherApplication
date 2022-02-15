import Weather from "./Weather.js";

const weather = new Weather();
const backgrounds = [
  {
    name: "Rain",
    url: "https://media0.giphy.com/media/v4O67LvPwtbS6ULWJS/giphy.gif?cid=790b76113633436a22702d46b5c2b570ec7d351146ed9dee&rid=giphy.gif&ct=s",
  },
  {
    name: "Snow",
    url: "https://media4.giphy.com/media/iq3nJr0SbPTcDpInRf/giphy.gif?cid=ecf05e470ec1o0wfkdpeo0n9j3257mq7nn70xln0id03n5s3&rid=giphy.gif&ct=g",
  },
  {
    name: "Clouds",
    url: "https://media0.giphy.com/media/5b9u8sfNYp4eXWwLYf/200w.webp?cid=ecf05e47pl3my04umww3spj0ifmabt3y1ma7ksus3ptpw3bb&rid=200w.webp&ct=g",
  },
  {
    name: "Clear",
    url: "https://1b-f.s3.eu-west-1.amazonaws.com/a/166346-389E52E8-FC15-49FD-A829-874CEC2F2089-0-1588626794.gif",
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

function renderToday(background, type) {
  let targetWindow = document.getElementById("window");
  let targetText = document.getElementById("todayText");
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

weather.setBackground(renderToday, backgrounds);
