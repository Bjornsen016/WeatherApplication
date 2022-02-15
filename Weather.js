export default class Weather {
  constructor() {
    this.key = "80a21c47a4285bedd4a78e3deec371e2";
    this.pos = [];
    this.data = [];
    this.currentWeather = [];
    this.hourlyWeather = [];
    this.dailyWeather = [];

    // Exempel
    // api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&appid=80a21c47a4285bedd4a78e3deec371e2
  }

  getPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  fetchWeather(pos) {
    const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
    url.searchParams.set("lat", pos.lat);
    url.searchParams.set("lon", pos.lon);
    url.searchParams.set("exclude", "minutely");
    url.searchParams.set("appid", this.key);

    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }

  setWeather(weatherData) {
    this.currentWeather = weatherData.cuurent;
    this.hourlyWeather = weatherData.hourly;
    this.dailyWeather = weatherData.daily;
  }

  getLocalWeather() {
    this.getPosition()
      .then(
        (res) =>
          (this.pos = { lat: res.coords.latitude, lon: res.coords.longitude })
      )
      .then(() => {
        this.fetchWeather(this.pos).then((data) => {
          this.setWeather(data);
        });
      });
  }
}
