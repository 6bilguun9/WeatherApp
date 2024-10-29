import "./moreInfo.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function moreInfo() {
  const location = useLocation(); // Access the location object
  const { feelsLike } = location.state;
  const { windSpeed } = location.state;
  const { temp } = location.state;
  return (
    <div className="container-moreInfo">
      {feelsLike !== undefined ? (
        <p>Feels Like: {feelsLike}°F</p> // Display the feels like value
      ) : (
        <p>No feels like data available.</p>
      )}
      {windSpeed !== undefined ? (
        <p>windSpeed: {windSpeed}mph</p> // Display the feels like value
      ) : (
        <p>No data available.</p>
      )}
      {temp !== undefined ? (
        <p>windSpeed: {temp}°F</p> // Display the feels like value
      ) : (
        <p>No data available.</p>
      )}

      <Link to="/">Back</Link>
    </div>
  );
}
export default moreInfo;
