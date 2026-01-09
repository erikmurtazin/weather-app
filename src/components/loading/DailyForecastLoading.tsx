const DailyForecastLoading = () => {
  const renderDaysFields = () => {
    return Array.from({ length: 7 }).map((_, index) => (
      <div
        key={index}
        className="w-full lg:h-auto md:h-35 sm:h-50 h-43 bg-item-bg rounded-xl border border-border animate-pulse"
      />
    ));
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <h3 className="font-custom-regular text-text text-lg my-3">
        Daily forecast
      </h3>
      <div className="grid flex-1 w-full grid-cols-3 md:grid-cols-7 md:gap-5 sm:gap-17 gap-7">
        {renderDaysFields()}
      </div>
    </div>
  );
};

export default DailyForecastLoading;
