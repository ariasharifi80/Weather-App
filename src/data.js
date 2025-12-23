// Import SVG icons
import clear from "./svg/wi-sunrise.svg";
import clouds from "./svg/wi-cloudy.svg";
import drizzle from "./svg/wi-sprinkle.svg";
import fog from "./svg/wi-fog.svg";
import hail from "./svg/wi-hail.svg";
import rain from "./svg/wi-rain.svg";
import snow from "./svg/wi-snow.svg";
import thunderstorm from "./svg/wi-thunderstorm.svg";
import tornado from "./svg/wi-tornado.svg";

// Define weatherIcons object
const weatherIcons = {
  clear: clear,
  clouds: clouds,
  drizzle: drizzle,
  fog: fog,
  hail: hail,
  rain: rain,
  snow: snow,
  thunderstorm: thunderstorm,
  tornado: tornado,
};

function getWeatherIcon(condition) {
  if (!condition) return weatherIcons.clear;

  const input = condition.toLowerCase().replace(/,/g, "").trim();

  // Map various weather conditions to icons
  if (input.includes("clear") || input.includes("sunny")) {
    return weatherIcons.clear;
  } else if (input.includes("cloud") || input.includes("overcast")) {
    return weatherIcons.clouds;
  } else if (input.includes("drizzle") || input.includes("light rain")) {
    return weatherIcons.drizzle;
  } else if (input.includes("fog") || input.includes("mist")) {
    return weatherIcons.fog;
  } else if (input.includes("hail")) {
    return weatherIcons.hail;
  } else if (input.includes("rain") || input.includes("shower")) {
    return weatherIcons.rain;
  } else if (input.includes("snow") || input.includes("sleet")) {
    return weatherIcons.snow;
  } else if (input.includes("thunder") || input.includes("storm")) {
    return weatherIcons.thunderstorm;
  } else if (input.includes("tornado")) {
    return weatherIcons.tornado;
  }

  // Default to clear icon if no match
  return weatherIcons.clear;
}

export { getWeatherIcon };
export default weatherIcons;
