import Weather from "./Weather.js";

const weather = new Weather();

async function test() {
	let test = await weather.getDailyWeather();
	console.log(test);
}

test();
