import { useState, useEffect } from "react";
import { parseData } from "./components/weather";
import logo from "./components/assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import sun from "./components/assets/sun.png";
import loading from "./components/assets/loading.png";
import GetIconCode from "./components/getIconCode";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [lat, setLat] = useState(10);
  const [long, setLong] = useState(10);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
  }, []);

  function positionSuccess({ coords }) {
    setLat(coords.latitude);
    setLong(coords.longitude);
  }

  function positionError() {
    alert(
      "There was an error getting your location please allow us to use your location and refresh the page"
    );
  }
  useEffect(() => {
    const fetchWeather = async () => {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get timezone

      const data = await parseData(lat, long, timeZone);
      if (data) {
        setWeatherData(data);
      }
    };

    fetchWeather();
  }, [lat, long]);

  const DayFormatter = new Intl.DateTimeFormat(undefined, { weekday: "long" });
  const HourFormatter = new Intl.DateTimeFormat(undefined, { hour: "numeric" });

  console.log(weatherData);

  return (
    <div className="container">
      <div className="navbar-container">
        <div className="logo-cont">
          <img src={logo} alt="The logo" className="logo" />
        </div>
        <div className="link-container">
          <div className="weather">
            <FontAwesomeIcon
              icon="fa-solid fa-cloud-sun-rain"
              className="icons"
            />
            <p className="name">weather</p>
          </div>
          <div className="cities">
            <FontAwesomeIcon icon="fa-regular fa-building" className="icons" />
            <p>cities</p>
          </div>
          <div className="settings">
            <FontAwesomeIcon icon="fa-solid fa-bars" className="icons" />
            <p>settings</p>
          </div>
        </div>
      </div>
      <div className="main">
        <input className="search" placeholder=" Search For Cities" />
        <div className="current">
          <div className="rn-info">
            <div className="city-rain">
              <h1 className="city">Hello, This is Bilguun's project</h1>
            </div>
            <h1 className="rn-temp">
              {weatherData.current
                ? weatherData.current.currentTemp
                : "Loading..."}
              °
            </h1>
          </div>
          <div>
            {weatherData.current ? (
              <GetIconCode
                iconCode={weatherData.current.iconCode}
                classCode={"current"}
              />
            ) : (
              <img src={loading} alt="" className="current-weather-figure" />
            )}
          </div>
        </div>
        <div className="hourly">
          <h1 className="topic-name">HOURLY WEATHER FORECAST</h1>
          <div className="hourly-info">
            {weatherData.hourly
              ? weatherData.hourly.slice(0, 7).map((hour) => {
                  return (
                    <div className="zero">
                      <h1 key={hour.timeStamp}>
                        {HourFormatter.format(hour.timeStamp)}
                      </h1>
                      <GetIconCode
                        iconCode={hour.iconCode}
                        classCode={"hourly"}
                      />
                      <h1>{hour.temp}</h1>
                    </div>
                  );
                })
              : "Loading..."}
          </div>
        </div>
        <div className="current-info">
          <h1 className="topic-name">AIR CONDITIONS</h1>
          <div className="top">
            <div className="detailed-info">
              <FontAwesomeIcon
                icon="fa-solid fa-temperature-three-quarters"
                className="icon"
              />
              <div className="detailed-numbers">
                <h1 className="topic-name">Real Feel</h1>
                <div className="numbers">
                  {weatherData.current
                    ? weatherData.current.feelsLike
                    : "Loading..."}
                  °
                </div>
              </div>
            </div>
            <div className="detailed-info">
              <FontAwesomeIcon icon="fa-solid fa-wind" className="icon" />
              <div className="detailed-numbers">
                <h1 className="topic-name">Wind Speed</h1>
                <div className="numbers">
                  {weatherData.current
                    ? weatherData.current.windSpeed
                    : "Loading..."}{" "}
                  mph
                </div>
              </div>
            </div>
          </div>
          <div className="top">
            <div className="detailed-info">
              <FontAwesomeIcon icon="fa-solid fa-sun" className="icon" />
              <div className="detailed-numbers">
                <h1 className="topic-name">Uv index</h1>
                <div className="numbers">
                  {weatherData.current ? weatherData.current.uv : "Loading..."}
                </div>
              </div>
            </div>
            <div className="detailed-info">
              <FontAwesomeIcon icon="fa-solid fa-droplet" className="icon" />
              <div className="detailed-numbers">
                <h1 className="topic-name">Precipitation</h1>
                <div className="numbers">
                  {weatherData.current
                    ? weatherData.current.percip
                    : "Loading..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="daily">
        <h1 className="topic-name">7-DAY FORECAST</h1>
        {weatherData.daily
          ? weatherData.daily.map((day) => (
              <div className="week-info">
                <h1 key={day.timeStamp}>
                  {DayFormatter.format(day.timeStamp)}
                </h1>
                <div className="weekly-weather-figure-container">
                  <GetIconCode iconCode={day.iconCode} classCode={"weekly"} />
                </div>
                <h1>{day.temperatureHigh}°</h1>
              </div>
            ))
          : "Loading..."}
      </div>
    </div>
  );
}

export default App;
