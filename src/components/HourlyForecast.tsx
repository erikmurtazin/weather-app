import { useEffect, useEffectEvent, useRef, useState } from 'react';
import iconDropdown from '../assets/images/icon-dropdown.svg';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { format, isAfter, parseISO } from 'date-fns';
import { getWeatherIcon } from '../utils/getWeatherIcon';
import { useOnClickOutside } from 'usehooks-ts';

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

// Maps a date string to a human-readable weekday
const getDay = (date: string): Day => {
  const dayIndex = parseISO(date).getDay();
  return days[dayIndex];
};

/**
 * Groups hourly forecast data indexes by their respective calendar dates.
 * Filters out hours that have already passed relative to the current time.
 */
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
  const ref = useRef<HTMLDivElement>(null!);

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

  const handleClickOutside = (event: MouseEvent | TouchEvent | FocusEvent) => {
    if (
      isDropdownOpen &&
      ref.current &&
      !ref.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  if (!forecast || !forecast.daily?.time[0] || !city.data) {
    return null;
  }

  const handleWeekdayClick = (day: string) => {
    setDay(day);
    setDropdownOpen(false);
  };

  // Renders the vertical list of weather windows for the selected day
  const renderHourlyWindows = () => {
    if (day === null) {
      return Array.from({ length: 24 }).map((_, index) => (
        <div
          key={index}
          className="h-12 w-full bg-btn-hover rounded-xl animate-pulse"
        ></div>
      ));
    }

    // Retrieve the indexes for the selected date from grouped data
    const indexes = getIndexesByDate(forecast.hourly, forecast.current.time)[
      day
    ];
    if (!indexes) return;

    return indexes.map((index) => {
      const hours = format(new Date(forecast.hourly.time[index]), 'HH');
      return (
        <div
          key={forecast.hourly.time[index]}
          className="h-14 w-full bg-btn-hover rounded-xl flex items-center justify-between px-3 border border-border"
        >
          <div className="flex items-center gap-1">
            <img
              src={getWeatherIcon(forecast.hourly.weather_code[index])}
              alt="icon"
              className="sm:h-15 sm:w-15 h-17 w-17"
            ></img>
            <span className="text-text sm:text-lg text-xl">{hours}</span>
          </div>

          <span className="text-text sm:text-lg sm:mx-5 mx-8 text-xl">
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
        onClick={() => handleWeekdayClick(date)}
        key={index}
        className="md:h-10 md:w-40 h-12 w-50 flex items-center px-2 bg-item-bg hover:bg-btn-hover text-text font-custom-regular rounded-lg"
      >
        {getDay(date)}
      </button>
    ));
  };

  return (
    <div className="bg-item-bg rounded-xl flex flex-col px-3 pb-3 overflow-y-auto no-scrollbar lg:h-150 min-h-110">
      <div className="flex justify-between items-center sticky top-0 z-20 bg-item-bg">
        <h3 className="font-custom-regular text-text text-lg">
          Hourly forecast
        </h3>
        <div className="h-18"></div>
        <div ref={ref} className="flex flex-col items-end relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="bg-btn-hover flex w-35 items-center h-11 justify-between px-3 rounded-lg hover:bg-gray-600"
          >
            <span className="font-custom-regular text-white">
              {day === null ? '-' : getDay(day)}
            </span>
            <img src={iconDropdown} className="h-4 w-4" />
          </button>
          {isDropdownOpen && (
            <ul className="absolute top-full z-20 p-2 mt-2 gap-2 bg-item-bg rounded-xl border border-border max-h-100 overflow-y-auto">
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
