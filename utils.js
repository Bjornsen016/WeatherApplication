/**
 * Creates a string to use of what to exlude from the fetch.
 * @param {string} include What weather data to include. 'current', 'minutely', 'hourly', 'daily', 'alerts' are the options
 * @returns {string} short string of what to ommit from the fetch.
 */
export function createExludeString(include) {
	const exludeArray = ["current", "minutely", "hourly", "daily", "alerts"];

	if (include == null || !exludeArray.includes(include.toLowerCase()))
		throw "Not a valid weather report string";

	let exludeString = "";
	exludeArray.every((string, index) => {
		if (string === include) return true;

		exludeString += string;
		if (index != exludeArray.length - 1) exludeString += ",";
		return true;
	});
	return exludeString;
}

/**
 * Converts a day number to a string.
 *
 * @param {Number} dayIndex
 * @return {String} Returns day as string
 */
export function dayOfWeekAsString(dayIndex) {
	return (
		["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"][
			dayIndex
		] || ""
	);
}
/**
 *
 * @param {string} string
 * @returns {string} The same string with the first letter uppercase.
 */
export function capitalizeFirstLetter(string) {
	return string[0].toUpperCase() + string.slice(1);
}

/**
 *
 * @param {number} unixTime
 * @returns {Date}
 */
export function generate24HourTime(unixTime) {
	return new Date(unixTime * 1000).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
}
