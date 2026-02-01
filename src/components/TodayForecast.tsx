import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { parseISO, format } from 'date-fns';
import { getWeatherIcon } from '../utils/getWeatherIcon';

// Displays the current weather status, location name, and detailed metrics for the selected city
const TodayForecast = () => {
  const forecast = useSelector((state: RootState) => state.forecast);
  const city = useSelector((state: RootState) => state.selectedCity);

  // Ensure data is loaded before attempting to render
  if (!forecast || !city.data) {
    return null;
  }

  // Convert API ISO string to a user-friendly date: "Tuesday, Oct 24, 2023"
  const date = parseISO(forecast.current.time);
  const formatedDate = format(date, 'EEEE, MMM d, yyyy');

  // Map the WMO weather code to a local asset path
  const weatherIcon = getWeatherIcon(forecast.current.weather_code);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="lg:h-65 md:h-75 h-80 w-full flex flex-col justify-center items-center bg-small md:bg-large bg-no-repeat bg-cover bg-center rounded-xl">
        <div className="flex md:justify-between md:flex-row md:p-10 flex-col items-center justify-between my-7 w-full p-3 h-full gap-5">
          <div>
            <h3 className="text-text sm:text-2xl text-3xl">
              {city.data?.name}, {city.data?.country}
            </h3>
            <span className="text-text">{formatedDate}</span>
          </div>
          <div className="flex items-center">
            <img src={weatherIcon} alt="icon" className="w-30 h-30" />
            <span className="text-text italic text-6xl sm:text-7xl">
              {forecast.current.temperature_2m}
              {forecast.current_units.temperature_2m}
            </span>
          </div>
        </div>
      </div>
      <div className="grid mt-7 w-full grid-cols-2 md:grid-cols-4 gap-5">
        <div className="w-full lg:h-27 md:h-32 h-35 rounded-xl bg-item-bg p-4 flex flex-col items-start justify-between border border-border">
          <span className="font-custom-regular text-text text-md">
            Feels Like
          </span>
          <span className="font-custom-regular text-text text-2xl">
            {forecast.current.apparent_temperature}{' '}
            {forecast.current_units.temperature_2m}
          </span>
        </div>
        <div className="w-full lg:h-27 md:h-32 h-35 rounded-xl bg-item-bg p-4 flex flex-col items-start justify-between border border-border">
          <span className="font-custom-regular text-text text-md">
            Humidity
          </span>
          <span className="font-custom-regular text-text text-2xl">
            {forecast.current.relative_humidity_2m}{' '}
            {forecast.current_units.relative_humidity_2m}
          </span>
        </div>
        <div className="w-full lg:h-27 md:h-32 h-35 rounded-xl bg-item-bg p-4 flex flex-col items-start justify-between border border-border">
          <span className="font-custom-regular text-text text-md">Wind</span>
          <span className="font-custom-regular text-text text-2xl">
            {forecast.current.wind_speed_10m}{' '}
            {forecast.current_units.wind_speed_10m}
          </span>
        </div>
        <div className="w-full lg:h-27 md:h-32 h-35 rounded-xl bg-item-bg p-4 flex flex-col items-start justify-between border border-border">
          <span className="font-custom-regular text-text text-md">
            Precipitation
          </span>
          <span className="font-custom-regular text-text text-2xl">
            {forecast.current.precipitation}{' '}
            {forecast.current_units.precipitation}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodayForecast;
