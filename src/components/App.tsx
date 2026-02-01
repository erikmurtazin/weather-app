import { useDispatch, useSelector } from 'react-redux';
import DailyForecast from './DailyForecast';
import Header from './Header';
import HourlyForecast from './HourlyForecast';
import Search from './Search';
import TodayForecast from './TodayForecast';
import type { RootState, AppDispatch } from '../store';
import { useEffect } from 'react';
import { setForecast } from '../slices/forecastSlice';
import { useForecast } from '../hooks/useForecast';
import { fetchCityById } from '../slices/citySlice';
import { notyf } from '../utils/notifications';
import 'notyf/notyf.min.css';

// Main entry point for the Weather Application
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCity = useSelector((state: RootState) => state.selectedCity);
  const units = useSelector((state: RootState) => state.units);

  // If the selected city is invalid, clear storage to prevent persistent app crashes
  useEffect(() => {
    if (selectedCity.error) {
      localStorage.removeItem('city');
      notyf.error(selectedCity.error);
    }
  }, [selectedCity.error]);

  // Reset units to default if saved preference is invalid
  useEffect(() => {
    if (units.error) {
      localStorage.removeItem('units');
      notyf.error(`${units.error} Default setting applied.`);
    }
  }, [units.error]);

  // Fetch forecast based on current coordinates and preferred units
  const forecast = useForecast(
    units.units,
    selectedCity?.data?.latitude,
    selectedCity?.data?.longitude,
  );

  // Handle Forecast API Errors
  useEffect(() => {
    if (forecast.isError) {
      notyf.error(forecast.error.message);
    }
  }, [forecast.isError, forecast.error]);

  // Fetch city data from API on initial mount
  useEffect(() => {
    dispatch(fetchCityById());
  }, [dispatch]);

  // Sync API response with global forecast state
  useEffect(() => {
    if (forecast.data?.data) {
      dispatch(setForecast(forecast.data.data));
    }
  }, [forecast.data, dispatch]);

  return (
    <div className="min-h-screen bg-background pt-6">
      <div className="max-w-300 w-full mx-auto md:px-7 sm:px-17 px-2">
        <Header />
        <main className="flex flex-col items-center w-full">
          <h1 className="text-center font-custom-bricolage text-5xl text-text my-12">
            How's the sky looking today?
          </h1>
          <Search />
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-7 my-7">
            <div className="w-full flex flex-col h-full lg:h-150 md:gap-5 gap-7">
              <TodayForecast />
              <DailyForecast />
            </div>
            <HourlyForecast />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
