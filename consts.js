/**
 * @fileoverview File for storing our constants.
 * @constant {Array} citys
 * @constant {Array} backgrounds
 */

/**
 *
 */
export const citys = [
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
		latitude: 55.604981,
		longitude: 13.003822,
	},
];

export const backgrounds = [
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

export function saveCitysToLocalStorage() {
	localStorage.setItem("citys", JSON.stringify(citys));
}

export function getCitysFromLocalStorage() {
	let storedCitys = JSON.parse(localStorage.getItem("citys"));
	if (storedCitys != null) {
		citys.splice(0);
		storedCitys.forEach((city) => {
			citys.push(city);
		});
	}
}
