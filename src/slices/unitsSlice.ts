import { createSlice } from '@reduxjs/toolkit';

export interface Units {
  wind_speed_unit?: 'mph';
  temperature_unit?: 'fahrenheit';
  precipitation_unit?: 'inch';
}

export interface UnitsState {
  units: Units;
  error: string | null;
}

const isUnitsValid = (obj: any): obj is Units => {
  return (
    obj &&
    (obj.wind_speed_unit ? obj.wind_speed_unit === 'mph' : true) &&
    (obj.temperature_unit ? obj.temperature_unit === 'fahrenheit' : true) &&
    (obj.precipitation_unit ? obj.precipitation_unit === 'inch' : true)
  );
};

const getUnitsFromStorage = (): UnitsState => {
  const item = localStorage.getItem('units');
  if (!item) return { units: {}, error: null };
  let parsed: any;
  try {
    parsed = JSON.parse(item);
  } catch {
    return { units: {}, error: 'Error parsing local storage.' };
  }
  if (!isUnitsValid(parsed)) return { units: {}, error: 'Wrong units.' };

  const { wind_speed_unit, temperature_unit, precipitation_unit } = parsed;

  const units: Units = {};
  if (wind_speed_unit) units.wind_speed_unit = wind_speed_unit;
  if (temperature_unit) units.temperature_unit = temperature_unit;
  if (precipitation_unit) units.precipitation_unit = precipitation_unit;

  return { units, error: null };
};

export const unitsSlice = createSlice({
  name: 'units',
  initialState: getUnitsFromStorage(),
  reducers: {
    setMph(state) {
      if (!state.units.wind_speed_unit) {
        state.units.wind_speed_unit = 'mph';
      }
      state.error = null;
    },
    removeMph(state) {
      if (state.units.wind_speed_unit) {
        delete state.units.wind_speed_unit;
      }
      state.error = null;
    },
    setFahrenheit(state) {
      if (!state.units.temperature_unit) {
        state.units.temperature_unit = 'fahrenheit';
      }
      state.error = null;
    },
    removeFahrenheit(state) {
      if (state.units.temperature_unit) {
        delete state.units.temperature_unit;
      }
      state.error = null;
    },
    setInch(state) {
      if (!state.units.precipitation_unit) {
        state.units.precipitation_unit = 'inch';
      }
      state.error = null;
    },
    removeInch(state) {
      if (state.units.precipitation_unit) {
        delete state.units.precipitation_unit;
      }
      state.error = null;
    },
  },
});

export const {
  setMph,
  removeMph,
  setFahrenheit,
  removeFahrenheit,
  setInch,
  removeInch,
} = unitsSlice.actions;

type ActionsUnion<A extends { [key: string]: (...args: any) => any }> =
  ReturnType<A[keyof A]>;

export type UnitsActions = ActionsUnion<typeof unitsSlice.actions>;

export default unitsSlice.reducer;
