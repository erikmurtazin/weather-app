import DailyForecast from './DailyForecast';
import Header from './Header';
import HourlyForecast from './HourlyForecast';
import Search from './Search';
import TodayForecast from './TodayForecast';

const App = () => {
  return (
    <div className="min-h-screen bg-background lg:py-4 py-6">
      <div className="max-w-[1140px] w-full mx-auto md:px-7 sm:px-17 px-6">
        <Header />
        <main className="flex flex-col items-center w-full">
          <h1 className="text-center font-custom-bricolage text-5xl text-text my-12">
            How's the sky looking today?
          </h1>
          <Search />
          <div className="w-full h-full lg:h-149 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-7 my-10">
            <div className="w-full flex flex-col h-full md:gap-5 gap-7">
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
