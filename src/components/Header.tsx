import logo from '../assets/images/logo.svg';
import iconUnits from '../assets/images/icon-units.svg';
import iconDropdown from '../assets/images/icon-dropdown.svg';
import { useState } from 'react';

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex justify-between">
      <a href="/">
        <img src={logo} alt="logo" />
      </a>
      <div className="flex flex-col items-end relative">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-30 h-11 flex flex-row bg-item-bg hover:bg-btn-hover justify-center items-center rounded-xl p-3 mb-3"
        >
          <img src={iconUnits} className="h-4 w-4" />
          <span className="font-custom-regular text-white mx-auto">Units</span>
          <img src={iconDropdown} className="h-4 w-4" />
        </button>
        {isDropdownOpen && (
          <div className="absolute top-full z-50 w-55 bg-item-bg rounded-xl p-2 border border-border flex flex-col">
            <div className="w-full flex flex-col items-start">
              <label className="text-sm text-label mx-2 my-1">
                Temperature
              </label>
              <button className="text-text h-9 w-full p-2 hover:bg-btn-hover flex justify-between items-center rounded-sm">
                Celcius (°C)
              </button>
              <button className="text-text h-9 w-full p-2 hover:bg-btn-hover flex justify-between items-center rounded-sm">
                Fahrenheit (°F)
              </button>
            </div>
            <hr className="border-t border-btn-hover my-1" />
            <div className="w-full flex flex-col items-start">
              <label className="text-sm text-label mx-2 my-1">Wind Speed</label>
              <button className="text-text h-9 w-full p-2 hover:bg-btn-hover flex justify-between items-center rounded-sm">
                km/h
              </button>
              <button className="text-text h-9 w-full p-2 hover:bg-btn-hover flex justify-between items-center rounded-sm">
                mph
              </button>
            </div>
            <hr className="border-t border-btn-hover my-1" />
            <div className="w-full flex flex-col items-start">
              <label className="text-sm text-label mx-2 my-1">
                Precipitation
              </label>
              <button className="text-text h-9 w-full p-2 hover:bg-btn-hover flex justify-between items-center rounded-sm">
                Millimeters (mm)
              </button>
              <button className="text-text h-9 w-full p-2 hover:bg-btn-hover flex justify-between items-center rounded-sm">
                Inches (in)
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
