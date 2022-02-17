import Weather from "./Weather.js";

const weather = new Weather(-122, 37);

async function test() {
	const city = await weather.getCity();
	console.log(city);
	/* något.then((data) => console.log(data)); */

	/* let test = weather.getWeather("daily");
	let test3;
	test.then((data) => (test3 = data));
	let test2 = await weather.getWeather("hourly");
	console.log(test2); */
}

test();
