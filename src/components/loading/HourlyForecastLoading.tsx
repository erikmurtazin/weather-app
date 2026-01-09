import React, { useState } from 'react';
import iconDropdown from '../assets/images/icon-dropdown.svg';

const HourlyForecastLoading = () => {
  const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ] as const;

  type Weekday = (typeof weekdays)[number];

  const [day, setDay] = useState<Weekday | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleWeekdayClick = (weekday: Weekday, index: number) => {
    setDay(weekday);
    setDropdownOpen((prev) => !prev);
  };
  const renderHourlyWindows = () => {
    return Array.from({ length: 24 }).map((_, index) => (
      <div
        key={index}
        className="h-12 w-full bg-btn-hover rounded-xl animate-pulse"
      ></div>
    ));
  };

  const renderWeekdays = () => {
    return weekdays.map((value, index) => (
      <button
        onClick={() => handleWeekdayClick(value, index)}
        key={index}
        className="md:h-10 md:w-40 h-12 w-50 flex items-center px-2 bg-item-bg hover:bg-btn-hover text-text font-custom-regular rounded-lg"
      >
        {value}
      </button>
    ));
  };
  return (
    <div className="bg-item-bg rounded-xl flex flex-col px-3 pb-3 overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center sticky top-0 z-2 bg-item-bg">
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
              {day ? String(day) : '—'}
            </span>
            <img src={iconDropdown} className="h-4 w-3 ml-3" />
          </button>
          {isDropdownOpen && (
            <ul className="absolute top-full z-3 p-2 gap-2 bg-item-bg rounded-xl border border-border">
              {renderWeekdays()}
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">{renderHourlyWindows()}</div>
    </div>
  );
};
export default HourlyForecastLoading;
