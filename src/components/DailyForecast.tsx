import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { parseISO, format } from 'date-fns';
import { getWeatherIcon } from '../utils/getWeatherIcon';

const DailyForecast = () => {
  const forecast = useSelector((state: RootState) => state.forecast);
  const city = useSelector((state: RootState) => state.selectedCity);
  if (!forecast || !city) {
    return <></>;
  }
  const getWeekday = (date: string) => {
    const weekday = format(parseISO(date), 'E');
    return weekday;
  };
  const renderDaysFields = () => {
    return forecast.daily.time.map((date, index) => (
      <div
        key={index}
        className="w-full lg:h-auto md:h-35 sm:h-50 h-43 bg-item-bg rounded-xl border border-border flex flex-col items-center justify-between md:py-2 py-5"
      >
        <span className="text-text">{getWeekday(date)}</span>
        <img
          src={getWeatherIcon(forecast.daily.weather_code[index])}
          alt="icon"
          className="h-18 w-18"
        ></img>
        <div className="flex justify-between w-full px-1">
          <span className="text-text text-sm">
            {forecast.daily.temperature_2m_max[index]}
            {'°'}
          </span>
          <span className="text-text text-sm">
            {forecast.daily.temperature_2m_min[index]}
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
      <div className="grid flex-1 w-full grid-cols-3 md:grid-cols-7 md:gap-3 sm:gap-17 gap-7">
        {renderDaysFields()}
      </div>
    </div>
  );
};

export default DailyForecast;
