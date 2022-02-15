import Weather from "./Weather.js";

const weather = new Weather();

async function test() {
	let test = await weather.getWeather("daily");
	console.log(test);
	let test2 = await weather.getWeather("hourly");
	console.log(test2);
}

test();
