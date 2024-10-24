import { weatherInfo } from "./weatherInfo";

function parseCurrentWeather(current, daily) {
  const {
    temperature_2m: currentTemp,
    wind_speed_10m: windSpeed,
    weather_code: iconCode,
    precipitation: percip,
    apparent_temperature: feelsLike,
  } = current;
  const {
    uv_index_max: [uv],
    daylight_duration: [lightDuration],
    sunrise: [sunRise],
    sunset: [sunSet],
  } = daily;
  return {
    currentTemp: Math.round(currentTemp),
    feelsLike: Math.round(feelsLike),
    windSpeed: Math.round(windSpeed),
    percip: Math.round(percip * 100) / 100,
    iconCode: Math.round(iconCode),
    uv: Math.round(uv),
    lightDuration: Math.round(lightDuration),
    sunRise: Math.round(sunRise),
    sunSet: Math.round(sunSet),
  };
}

function parseDailyWeather(daily) {
  return daily.time.map((time, index) => {
    return {
      timeStamp: time * 1000,
      iconCode: daily.weather_code[index],
      temperatureHigh: Math.round(daily.temperature_2m_max[index]),
    };
  });
}

function parseHourlyWeather(hourly, current) {
  return hourly.time
    .map((time, index) => {
      return {
        timeStamp: time * 1000,
        iconCode: hourly.weather_code[index],
        temp: Math.round(hourly.temperature_2m[index]),
        feelsLike: Math.round(hourly.apparent_temperature[index]),
        windSpeed: Math.round(hourly.wind_speed_10m[index]),
        percip: Math.round(hourly.precipitation[index] * 100) / 100,
      };
    })
    .filter(({ timeStamp }) => timeStamp >= current.time * 1000);
}

export const parseData = async (lat, long, timeZone) => {
  let data = await weatherInfo(lat, long, timeZone);
  if (!data) {
    console.error("Failed to fetch data");
    return null; // Or handle this case in a way that makes sense for your app
  }

  return {
    current: parseCurrentWeather(data.current, data.daily),
    daily: parseDailyWeather(data.daily),
    hourly: parseHourlyWeather(data.hourly, data.current),
  };
};
