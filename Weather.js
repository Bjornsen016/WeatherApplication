// Kims nyckel: be39c2840d85ea762047c50843b4d1c4
// Idris nyckel: 80a21c47a4285bedd4a78e3deec371e2

import { createExludeString } from "./utils.js";
export default class Weather {
	constructor(longitude = 24.943091, latitude = 60.1685) {
		this.key = "be39c2840d85ea762047c50843b4d1c4";

		this.longitude = longitude;
		this.latitude = latitude;

		this.url = new URL("https://api.openweathermap.org");
		this.url.pathname = "/data/2.5/onecall";
		this.url.searchParams.set("units", "metric");
		this.url.searchParams.set("lang", "sv");
		this.url.searchParams.set("appid", `${this.key}`);
		this.url.searchParams.set("lat", latitude);
		this.url.searchParams.set("lon", longitude);

		// Exempel
		// api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&appid=80a21c47a4285bedd4a78e3deec371e2
	}
	/**
	 *
	 * @param {number} longitude
	 * @param {number} latitude
	 * @param {string} include Part of the weather report that you want to look at.
	 * @returns {string} A string with an URL to use in the API call.
	 */
	buildURL(longitude, latitude, include) {
		const url = new URL("", this.url);
		url.searchParams.set("lat", latitude);
		url.searchParams.set("lon", longitude);

		let exludeString = createExludeString(include);

		url.searchParams.set("exclude", exludeString);

		return url.href;
	}

	/**
	 *
	 * @param {number} lat
	 * @param {number} long
	 * @returns {Object} An object with daily weather info
	 */
	async getDailyWeather(lat = this.latitude, long = this.longitude) {
		const url = this.buildURL(lat, long, "daily");

		return await fetch(url).then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not OK" + response.status);
			}
			return response.json();
		});
	}
}
