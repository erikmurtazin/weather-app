import iconSearch from '../assets/images/icon-search.svg';
const Search = () => {
  return (
    <div className="flex justify-center w-full h-14 md:max-w-120 bg-item-bg rounded-2xl px-4">
      <img src={iconSearch} alt="search" className="mr-1" />
      <input
        className="text-text font-custom-regular text-2xl w-full p-3"
        type="text"
        placeholder="Search for a place"
      />
    </div>
  );
};

export default Search;
