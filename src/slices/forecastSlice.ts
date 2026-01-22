import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ForecastState {
  latitude: number;
  longitude: number;
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
    weather_code: number;
    time: string;
    apparent_temperature: number;
  };
  current_units: {
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    precipitation: string;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
}

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState: null as ForecastState | null,
  reducers: {
    setForecast(_, action: PayloadAction<ForecastState | null>) {
      return action.payload;
    },
  },
});

export const { setForecast } = forecastSlice.actions;
export default forecastSlice.reducer;
