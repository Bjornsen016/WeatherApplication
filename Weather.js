export default class Weather {
  constructor() {
    this.key = "80a21c47a4285bedd4a78e3deec371e2";
    this.pos = [];

    // Exempel
    // api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&appid=80a21c47a4285bedd4a78e3deec371e2
  }

  getPosition() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(resolve, (err) => {
        alert(error);
      });
    });
  }

  fetchWeather(pos) {
    const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
    url.searchParams.set("lat", pos.lat);
    url.searchParams.set("lon", pos.lon);
    url.searchParams.set("exclude", "minutely");
    url.searchParams.set("appid", this.key);
    url.searchParams.set("lang", "se");

    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  }

  getWeather(weatherData) {
    return {
      current: weatherData.current,
      hourly: weatherData.hourly,
      daily: weatherData.daily,
    };
  }

  getLocalWeather() {
    return this.getPosition()
      .then(
        (res) =>
          (this.pos = { lat: res.coords.latitude, lon: res.coords.longitude })
      )
      .then(() => {
        return this.fetchWeather(this.pos).then((data) =>
          this.getWeather(data)
        );
      });
  }

  async setBackground(callback, backgrounds) {
    this.getLocalWeather().then((data) => {
      const currentCondition = data.current.weather[0].main;
      let background = backgrounds.filter(
        (item) => item.name == currentCondition
      );
      callback(background[0].url, currentCondition);
    });
  }

  getHourly(callback) {
    this.getLocalWeather().then((data) => {
      for (let i = 0; i < 24; i = i + 4) {
        callback(data.hourly[i]);
      }
    });
  }

  getDaily(callback) {
    this.getLocalWeather().then((data) => {
      data.daily.map((item) => {
        callback(item);
      });
    });
  }
}
