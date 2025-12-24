import iconDropdown from '../assets/images/icon-dropdown.svg';

const HourlyForecast = () => {
  const renderOurlyWindows = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="lg:h-12 h-17 w-full bg-btn-hover rounded-xl"
      ></div>
    ));
  };
  return (
    <div className="bg-item-bg p-5 rounded-xl lg:h-full h-fit">
      <div className="flex justify-between">
        <h3 className="font-custom-regular text-text text-lg mt-1 mb-3">
          Hourly forecast
        </h3>
        <button className="bg-btn-hover flex min-w-25 items-center h-10 justify-between px-3 rounded-lg hover:bg-gray-600">
          <span className="font-custom-regular text-white">—</span>
          <img src={iconDropdown} className="h-3 w-3" />
        </button>
      </div>
      <div className="flex flex-col gap-3 mt-3">{renderOurlyWindows()}</div>
    </div>
  );
};
export default HourlyForecast;
