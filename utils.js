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
