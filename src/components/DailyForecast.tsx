import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { parseISO, format } from 'date-fns';
import { getWeatherIcon } from '../utils/getWeatherIcon';

/**
 * Displays a 7-day weather forecast grid.
 * Maps through daily weather arrays to render individual day cards.
 */

const DailyForecast = () => {
  const forecast = useSelector((state: RootState) => state.forecast);
  const city = useSelector((state: RootState) => state.selectedCity);

  // Prevent rendering if weather data or city context is missing
  if (!forecast || !city.data) {
    return null;
  }

  /**
   * Converts an ISO date string into a short weekday name.
   * @param date ISO date string from the API
   */
  const getWeekday = (date: string) => {
    const weekday = format(parseISO(date), 'E');
    return weekday;
  };

  // Iterates through the daily forecast arrays and returns a collection of JSX elements
  const renderDaysFields = () => {
    return forecast.daily.time.map((date, index) => (
      <div
        key={index}
        className="w-full lg:h-auto md:h-35 sm:h-50 h-43 bg-item-bg rounded-xl border border-border flex flex-col items-center justify-between md:py-2 py-5"
      >
        <span className="text-text text-lg">{getWeekday(date)}</span>
        <img
          src={getWeatherIcon(forecast.daily.weather_code[index])}
          alt="icon"
          className="sm:h-18 sm:w-18 w-22 h-22"
        ></img>
        <div className="flex justify-between w-full sm:px-1 px-3">
          <span className="text-text sm:text-sm text-lg">
            {forecast.daily.temperature_2m_min[index]}
            {'°'}
          </span>
          <span className="text-text sm:text-sm text-lg">
            {forecast.daily.temperature_2m_max[index]}
            {'°'}
          </span>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <h3 className="font-custom-regular text-text text-lg my-3">
        Daily forecast
      </h3>
      <div className="grid flex-1 w-full grid-cols-3 md:grid-cols-7 gap-3">
        {renderDaysFields()}
      </div>
    </div>
  );
};

export default DailyForecast;
