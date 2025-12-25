import React, { useState } from 'react';
import iconDropdown from '../assets/images/icon-dropdown.svg';

const HourlyForecast = () => {
  const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
  ] as const;

  type Weekday = typeof weekdays[number];

  const [day, setDay] = useState<Weekday | null>(null)
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleWeekdayClick = (weekday: Weekday, index: number) => {
    setDay(weekday);
    setDropdownOpen(prev => !prev)
  }
  const renderOurlyWindows = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="lg:h-12 h-17 w-full bg-btn-hover rounded-xl"
      ></div>
    ));
  };

  const renderWeekdays = () => {
    return weekdays.map((value, index) => (
      <button 
      onClick={() => handleWeekdayClick(value, index)}
      key={index} className='md:h-10 md:w-40 h-12 w-50 flex items-center px-2 bg-item-bg hover:bg-btn-hover text-text font-custom-regular rounded-lg'>
        {value}
      </button>
    ))
  }
  return (
    <div className="bg-item-bg p-5 rounded-xl lg:h-full h-fit">
      <div className="flex justify-between">
        <h3 className="font-custom-regular text-text text-lg mt-1 mb-3">
          Hourly forecast
        </h3>
        <div className='flex flex-col items-end relative'>
          <button 
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="bg-btn-hover flex min-w-26 items-center h-10 justify-between px-3 rounded-lg hover:bg-gray-600 mb-2">
            <span className="font-custom-regular text-white">{day ? String(day) : "—"}</span>
            <img src={iconDropdown} className="h-4 w-3 ml-3" />
          </button>
          {isDropdownOpen && ( 
            <ul className='absolute top-full z-50 p-2 gap-2 bg-item-bg rounded-xl border border-border'>
              {renderWeekdays()}
            </ul>
          )}
                 </div>
              </div>
      <div className="flex flex-col gap-3 mt-1">{renderOurlyWindows()}</div>
    </div>
  );
};
export default HourlyForecast;
