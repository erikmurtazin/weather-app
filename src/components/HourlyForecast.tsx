import React, { useEffect, useEffectEvent, useRef, useState } from 'react';
import iconDropdown from '../assets/images/icon-dropdown.svg';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { format, isAfter, parseISO } from 'date-fns';
import { getWeatherIcon } from '../utils/getWeatherIcon';
type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';
const days: Day[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
interface HourlyForecastTime {
  time: string[];
}

interface IndexesByDate {
  [date: string]: number[];
}

const getDay = (date: string): Day => {
  const dayIndex = parseISO(date).getDay();
  return days[dayIndex];
};

const getIndexesByDate = (
  forecastTime: HourlyForecastTime,
  currentTime: string,
) => {
  const now = new Date(currentTime);
  const indexes = forecastTime.time.reduce(
    (acc: IndexesByDate, time, index) => {
      const hourlyTime = new Date(time);
      if (isAfter(now, hourlyTime)) return acc;

      const date = format(parseISO(time), 'yyyy-MM-dd');

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(index);
      return acc;
    },
    {},
  );
  return indexes;
};

const HourlyForecast = () => {
  const forecast = useSelector((state: RootState) => state.forecast);
  const city = useSelector((state: RootState) => state.selectedCity);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [day, setDay] = useState<string | null>(null);
  const updateDay = useEffectEvent((date: string) => {
    setDay(date);
  });
  useEffect(() => {
    if (forecast?.daily.time[0]) {
      updateDay(forecast.daily.time[0]);
    }
  }, [forecast]);
  if (!forecast || !forecast.daily?.time[0] || !city) {
    return null;
  }

  const handleWeekdayClick = (day: string) => {
    setDay(day);
    setDropdownOpen(false);
  };
  const renderHourlyWindows = () => {
    if (day === null) {
      return Array.from({ length: 24 }).map((_, index) => (
        <div
          key={index}
          className="h-12 w-full bg-btn-hover rounded-xl animate-pulse"
        ></div>
      ));
    }
    const indexes = getIndexesByDate(forecast.hourly, forecast.current.time)[
      day
    ];
    return indexes.map((index) => {
      const hours = format(new Date(forecast.hourly.time[index]), 'HH');
      return (
        <div
          key={forecast.hourly.time[index]}
          className="h-14 w-full bg-btn-hover rounded-xl flex items-center justify-between px-3"
        >
          <div className="flex items-center gap-1">
            <img
              src={getWeatherIcon(forecast.hourly.weather_code[index])}
              alt="icon"
              className="h-14 w-14"
            ></img>
            <span className="text-text text-lg">{hours}</span>
          </div>

          <span className="text-text text-lg mx-5">
            {forecast.hourly.temperature_2m[index]}
            {'°'}
          </span>
        </div>
      );
    });
  };

  const renderWeekdays = () => {
    return forecast.daily.time.map((date, index) => (
      <button
        onClick={() => handleWeekdayClick(date, index)}
        key={index}
        className="md:h-10 md:w-40 h-12 w-50 flex items-center px-2 bg-item-bg hover:bg-btn-hover text-text font-custom-regular rounded-lg"
      >
        {getDay(date)}
      </button>
    ));
  };
  return (
    <div className="bg-item-bg rounded-xl flex flex-col px-3 pb-3 overflow-y-auto no-scrollbar lg:h-150 min-h-105">
      <div className="flex justify-between items-center sticky top-0 z-20 bg-item-bg">
        <h3 className="font-custom-regular text-text text-lg">
          Hourly forecast
        </h3>
        <div className="h-15"></div>
        <div className="flex flex-col items-end relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="bg-btn-hover flex min-w-26 items-center h-10 justify-between px-3 rounded-lg hover:bg-gray-600"
          >
            <span className="font-custom-regular text-white">
              {day === null ? '-' : getDay(day)}
            </span>
            <img src={iconDropdown} className="h-4 w-3 ml-3" />
          </button>
          {isDropdownOpen && (
            <ul className="absolute top-full z-20 p-2 gap-2 bg-item-bg rounded-xl border border-border max-h-100 overflow-y-auto">
              {renderWeekdays()}
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">{renderHourlyWindows()}</div>
    </div>
  );
};
export default HourlyForecast;
