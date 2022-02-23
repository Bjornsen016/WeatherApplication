import Weather from "./Weather.js";
import {
	dayOfWeekAsString,
	capitalizeFirstLetter,
	generate24HourTime,
} from "./utils.js";
import {
	citys,
	backgrounds,
	getCitysFromLocalStorage,
	saveCitysToLocalStorage,
} from "./consts.js";

const weather = new Weather();

//TODO Fixa en init funktion!?
getCitysFromLocalStorage();
renderSavedCitys();

//TODO: Ordna fram för Alla olika. Sätt en bugg för "Mist"
//TODO: Såg att man kan ha mer än ett väder. Det får vi kanske kolla upp.

document.getElementById("saved").addEventListener("click", (e) => {
	let target = e.target;

	if (target.tagName == "EM") {
		const dropdown = document.getElementById("dropdown");

		if (dropdown.style.display === "none") dropdown.style.display = "flex";
		else dropdown.style.display = "none";
	}

	if (target.tagName === "LI") {
		const city = target.innerText;
		const cityHeader = document.getElementById("city-header");
		cityHeader.innerText = target.innerText;
		const newLocation = citys.filter((place) => place.city === city)[0];
		weather.location = newLocation;

		// Kalla på funktionen som plockar fram vädret för staden
		weather.getWeather("current").then((data) => renderNow(data.current));
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
			weather.getWeather("current").then((data) => renderNow(data.current));
			if (weather.location.city == "") renderCity();

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
			});
			if (weather.location.city == "") renderCity();

			break;
		case 3:
			clearMain();
			weather.getWeather("daily").then((week) => {
				week.daily.forEach((day) => {
					renderDayCard(day);
				});
			});
			if (weather.location.city == "") renderCity();

			break;
	}
});

async function addCity(city) {
	const target = document.getElementById("savedList");
	if (city !== "") {
		let pos = await weather.getCoordinatesFromCityName(city);
		citys.push(pos);
		saveCitysToLocalStorage();

		target.innerHTML += `<li>${city}</li>`;
	}
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
	let time = generate24HourTime(item.dt);

	main.innerHTML += `
    <article>
        <h1>${time}</h1>
        <h2>${Math.floor(item.temp) + " ℃"}</h2>
        <img src="http://openweathermap.org/img/wn/${
					item.weather[0].icon
				}@2x.png" alt="${capitalizeFirstLetter(item.weather[0].description)}" />
        <p>${capitalizeFirstLetter(item.weather[0].description)}</p>
    </article> 
    `;
}

function renderDayCard(item) {
	const main = document.getElementById("main");
	const t = new Date(item.dt * 1000);

	main.innerHTML += `
  <article>
    <h1>${dayOfWeekAsString(t.getDay())}<br>${t.toLocaleDateString()}</br></h1>
    <h2>${Math.floor(item.temp.day) + " ℃"}</h2>
    <img src="http://openweathermap.org/img/wn/${
			item.weather[0].icon
		}@2x.png" alt="${capitalizeFirstLetter(item.weather[0].description)}" />
    <p>${capitalizeFirstLetter(item.weather[0].description)}</p>
  </article> `;
}

function renderCity() {
	weather.getCity().then((city) => {
		const cityHeader = document.getElementById("city-header");
		console.log(city);
		cityHeader.innerText = city;
	});
}

function renderSavedCitys() {
	const savedList = document.getElementById("savedList");

	citys.forEach((city) => {
		savedList.innerHTML += `<li>${city.city}</li>`;
	});
}

weather.getLocalWeather("current").then((data) => {
	renderNow(data.current);
	renderCity();
});
