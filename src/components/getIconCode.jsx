import sun from "./assets/sun.png";
import sunCloud from "./assets/sunCloud.png";
import rain from "./assets/sunRain.png";
import snow from "./assets/sunRain.png";
import cloud from "./assets/cloud.webp";
import fog from "./assets/fog.webp";
import thunder from "./assets/thunder.png";
const GetIconCode = ({ iconCode, classCode }) => {
  const figure = classCode + "-weather-figure";

  let icon = sun;
  if (iconCode <= 1) {
    icon = sun;
  }
  if ((iconCode === 81, iconCode === 82, iconCode === 80)) {
    icon = rain;
  } else if (iconCode == 2) {
    icon = sunCloud;
  } else if (iconCode == 3) {
    icon = fog;
  } else if (iconCode <= 48) {
    icon = fog;
  } else if (iconCode <= 67) {
    icon = rain;
  } else if (iconCode <= 86) {
    icon = snow;
  } else if (iconCode < 100) {
    icon = thunder;
  }

  return <img src={icon} alt="" className={figure} />;
};
export default GetIconCode;
