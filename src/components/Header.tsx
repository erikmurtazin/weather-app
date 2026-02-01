import logo from '../assets/images/logo.svg';
import iconUnits from '../assets/images/icon-units.svg';
import iconDropdown from '../assets/images/icon-dropdown.svg';
import iconCheck from '../assets/images/icon-checkmark.svg';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import {
  removeFahrenheit,
  removeInch,
  removeMph,
  setFahrenheit,
  setInch,
  setMph,
  type UnitsActions,
} from '../slices/unitsSlice';
import { useOnClickOutside } from 'usehooks-ts';

type SetLocalStorageUnit =
  | { temperature_unit: 'fahrenheit' }
  | { wind_speed_unit: 'mph' }
  | { precipitation_unit: 'inch' };

type RemoveLocalStorageUnit =
  | 'temperature_unit'
  | 'wind_speed_unit'
  | 'precipitation_unit';

/**
 * Application Header component.
 * Features a logo and a settings dropdown to toggle measurement units
 * (Temperature, Wind Speed, Precipitation).
 */

const Header = () => {
  const ref = useRef<HTMLDivElement>(null!);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const units = useSelector((state: RootState) => state.units);

  const dispatch = useDispatch();

  /**
   * Resets a specific unit to its default value.
   * Updates Redux state and removes the override from localStorage.
   */
  const normalizeUnits = (
    action: UnitsActions,
    unit: RemoveLocalStorageUnit,
  ) => {
    dispatch(action);
    removeLocalStorage(unit);
  };

  /**
   * Sets a specific unit to a non-default value.
   * Updates Redux state and persists the choice in localStorage.
   */
  const setUnits = (action: UnitsActions, unit: SetLocalStorageUnit) => {
    dispatch(action);
    setLocalStorage(unit);
  };

  // Merges and saves unit preferences to localStorage
  const setLocalStorage = (unit: SetLocalStorageUnit) => {
    const raw = localStorage.getItem('units');
    const units = {
      ...(raw ? JSON.parse(raw) : {}),
      ...unit,
    };

    localStorage.setItem('units', JSON.stringify(units));
  };

  // Removes a specific unit key from localStorage when reverting to defaults
  const removeLocalStorage = (unit: RemoveLocalStorageUnit) => {
    const raw = localStorage.getItem('units');
    if (raw) {
      const units = JSON.parse(raw);
      delete units[unit];
      localStorage.setItem('units', JSON.stringify(units));
    }
  };

  // Closes the dropdown if a click occurs outside the component area
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

  return (
    <header className="flex justify-between">
      <a href="/">
        <img src={logo} alt="logo" />
      </a>
      <div ref={ref} className="flex flex-col items-end relative">
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
            <div className="w-full flex flex-col items-start gap-1">
              <label className="text-sm text-label mx-2 my-1">
                Temperature
              </label>
              <button
                onClick={() =>
                  normalizeUnits(removeFahrenheit(), 'temperature_unit')
                }
                className={`text-text h-9 w-full p-2 hover:bg-btn-hover flex justify-between items-center rounded-sm ${!units.units.temperature_unit ? 'bg-btn-hover disabled' : 'bg-item-bg'}`}
              >
                Celcius (°C){' '}
                {!units.units.temperature_unit ? <img src={iconCheck} /> : null}
              </button>
              <button
                onClick={() =>
                  setUnits(setFahrenheit(), { temperature_unit: 'fahrenheit' })
                }
                className={`text-text h-9 w-full p-2 hover:bg-btn-hover flex justify-between items-center rounded-sm ${units.units.temperature_unit ? 'bg-btn-hover disabled' : 'bg-item-bg'}`}
              >
                Fahrenheit (°F){' '}
                {units.units.temperature_unit ? <img src={iconCheck} /> : null}
              </button>
            </div>
            <hr className="border-t border-btn-hover my-1" />
            <div className="w-full flex flex-col items-start gap-1">
              <label className="text-sm text-label mx-2 my-1">Wind Speed</label>
              <button
                onClick={() => normalizeUnits(removeMph(), 'wind_speed_unit')}
                className={`text-text h-9 w-full p-2 hover:bg-btn-hover flex justify-between items-center rounded-sm ${!units.units.wind_speed_unit ? 'bg-btn-hover disabled' : 'bg-item-bg'}`}
              >
                km/h
                {!units.units.wind_speed_unit ? <img src={iconCheck} /> : null}
              </button>
              <button
                onClick={() => setUnits(setMph(), { wind_speed_unit: 'mph' })}
                className={`text-text h-9 w-full p-2 hover:bg-btn-hover flex justify-between items-center rounded-sm ${units.units.wind_speed_unit ? 'bg-btn-hover disabled' : 'bg-item-bg'}`}
              >
                mph
                {units.units.wind_speed_unit ? <img src={iconCheck} /> : null}
              </button>
            </div>
            <hr className="border-t border-btn-hover my-1" />
            <div className="w-full flex flex-col items-start gap-1">
              <label className="text-sm text-label mx-2 my-1">
                Precipitation
              </label>
              <button
                onClick={() =>
                  normalizeUnits(removeInch(), 'precipitation_unit')
                }
                className={`text-text h-9 w-full p-2 hover:bg-btn-hover flex justify-between items-center rounded-sm ${!units.units.precipitation_unit ? 'bg-btn-hover disabled' : 'bg-item-bg'}`}
              >
                Millimeter (mm)
                {!units.units.precipitation_unit ? (
                  <img src={iconCheck} />
                ) : null}
              </button>
              <button
                onClick={() =>
                  setUnits(setInch(), { precipitation_unit: 'inch' })
                }
                className={`text-text h-9 w-full p-2 hover:bg-btn-hover flex justify-between items-center rounded-sm ${units.units.precipitation_unit ? 'bg-btn-hover disabled' : 'bg-item-bg'}`}
              >
                Inches (in)
                {units.units.precipitation_unit ? (
                  <img src={iconCheck} />
                ) : null}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
