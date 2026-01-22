import { useDispatch, useSelector } from 'react-redux';
import DailyForecast from './DailyForecast';
import Header from './Header';
import HourlyForecast from './HourlyForecast';
import Search from './Search';
import TodayForecast from './TodayForecast';
import type { RootState } from '../store';
import { useEffect } from 'react';
import { setForecast } from '../slices/forecastSlice';
import { useForecast } from '../hooks/useForecast';

const App = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state: RootState) => state.selectedCity);

  const forecast = useForecast(selectedCity?.latitude, selectedCity?.longitude);

  useEffect(() => {
    if (forecast.data?.data) {
      dispatch(setForecast(forecast.data.data));
    }
  }, [forecast.data, dispatch]);

  return (
    <div className="min-h-screen bg-background pt-6">
      <div className="max-w-[1200px] w-full mx-auto md:px-7 sm:px-17 px-6">
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
