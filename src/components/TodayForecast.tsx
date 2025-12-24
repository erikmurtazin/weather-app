const TodayForecast = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="lg:h-65 md:h-75 h-80 w-full flex flex-col justify-center items-center bg-item-bg rounded-xl">
        <div className="flex space-x-2 flex-row items-center justify-center">
          <div className="h-3 w-3 bg-text rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-3 w-3 bg-text rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-3 w-3 bg-text rounded-full animate-bounce"></div>
        </div>
        <span className="text-text font-custom-regular">Loading...</span>
      </div>
      <div className="grid mt-7 w-full grid-cols-2 md:grid-cols-4 gap-5">
        <div className="w-full lg:h-27 md:h-32 h-35 rounded-xl bg-item-bg p-4 flex flex-col items-start justify-between">
          <span className="font-custom-regular text-text text-md">
            Feels Like
          </span>
          <span className="font-custom-regular text-text text-2xl">—</span>
        </div>
        <div className="w-full lg:h-27 md:h-32 h-35 rounded-xl bg-item-bg p-4 flex flex-col items-start justify-between">
          <span className="font-custom-regular text-text text-md">
            Humidity
          </span>
          <span className="font-custom-regular text-text text-2xl">—</span>
        </div>
        <div className="w-full lg:h-27 md:h-32 h-35 rounded-xl bg-item-bg p-4 flex flex-col items-start justify-between">
          <span className="font-custom-regular text-text text-md">Wind</span>
          <span className="font-custom-regular text-text text-2xl">—</span>
        </div>
        <div className="w-full lg:h-27 md:h-32 h-35 rounded-xl bg-item-bg p-4 flex flex-col items-start justify-between">
          <span className="font-custom-regular text-text text-md">
            Precipitation
          </span>
          <span className="font-custom-regular text-text text-2xl">—</span>
        </div>
      </div>
    </div>
  );
};

export default TodayForecast;
