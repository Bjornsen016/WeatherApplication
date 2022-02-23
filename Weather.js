// Kims nyckel: be39c2840d85ea762047c50843b4d1c4
// Idris nyckel: 80a21c47a4285bedd4a78e3deec371e2

import { createExludeString } from "./utils.js";
export default class Weather {
	constructor(longitude = 11.977863, latitude = 57.716619) {
		this.location = { longitude: longitude, latitude: latitude, city: "" };

		this.key = "be39c2840d85ea762047c50843b4d1c4";
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
	 * @param {string} whatWeatherData
	 * @param {number} lat
	 * @param {number} long
	 * @param {string} include Part of the weather report that you want to look at.
	 * @returns {Object} An object with daily weather info
	 */
	async getWeather(
		whatWeatherData,
		lat = this.location.latitude,
		long = this.location.longitude
	) {
		const url = this.buildURL(long, lat, whatWeatherData);

		return await fetch(url).then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not OK" + response.status);
			}
			return response.json();
		});
	}
	/**
	 *
	 * @returns A promis with position information. We want to look at position.coords.latitude / longitude
	 */
	getPosition() {
		return new Promise((resolve) =>
			navigator.geolocation.getCurrentPosition(resolve, (err) => {
				throw err;
			})
		);
	}
	/**
	 *
	 * @param {string} whatWeatherData - what weather information we want.
	 * @returns {Object} A weather report object
	 */
	async getLocalWeather(whatWeatherData) {
		const pos = await this.getPosition();

		this.location.latitude = pos.coords.latitude;
		this.location.longitude = pos.coords.longitude;
		this.location.city = "";

		return await this.getWeather(whatWeatherData);
	}

	/**
	 *
	 * @param {position} position
	 * @param {string} whatWeatherData
	 * @returns {Object}
	 */
	async getWeatherAtSpecificPosition(position, whatWeatherData) {
		this.position = position;

		return await this.getWeather(whatWeatherData);
	}

	/**
	 *
	 * @returns {string} City name
	 */
	async getCity() {
		const url = new URL("https://api.bigdatacloud.net");
		url.pathname = "/data/reverse-geocode-client";
		url.searchParams.set("latitude", this.location.latitude);
		url.searchParams.set("longitude", this.location.longitude);
		url.searchParams.set("localityLanguage", "sv");
		console.log(url.href);

		const returnedCity = await fetch(url).then((response) => response.json());

		returnedCity.city != ""
			? (this.location.city = returnedCity.city)
			: (this.location.city = returnedCity.localityInfo.administrative[4].name);
		return this.location.city;
	}

	/**
	 *
	 * @param {string} city
	 * @returns {position}
	 */
	async getCoordinatesFromCityName(city) {
		let url = new URL("https://us1.locationiq.com");
		url.pathname = "/v1/search.php";
		url.searchParams.set("q", city);
		url.searchParams.set("key", "pk.0978cb132be9fe7fa4aba7c81887136f");
		url.searchParams.set("format", "json");

		const returnedPosition = await fetch(url).then((response) =>
			response.json()
		);

		console.log(returnedPosition[0]); //Första positionen verkar nästan alltid vara vettigast iaf.

		const position = {
			city: city,
			latitude: returnedPosition[0].lat,
			longitude: returnedPosition[0].lon,
		};

		return position;
	}
}
