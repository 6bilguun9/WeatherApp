import { useState, useEffect } from "react";
import { parseData } from "./components/weather";
import logo from "./components/assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRoutes } from "react-router-dom";
import "./App.css";
import loading from "./components/assets/loading.png";
import GetIconCode from "./components/getIconCode";
import MoreInfo from "./components/moreInfo";
import Home from "./components/home";
import { Link } from "react-router-dom";

function App() {
  const routes = useRoutes([
    {
      path: "/moreInfo/:timeStamp",
      element: <MoreInfo />,
    },
    {
      path: "/",
      element: <Home />,
    },
  ]);
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
      {routes}
    </div>
  );
}

export default App;
