import { connect, useSelector } from 'react-redux';
import type { SearchResultsInterface } from '../slices/searchResultsSlice';

const SearchSuggestions = () => {
  interface SearchResultsState {
    searchResults: SearchResultsInterface[];
  }
  const searchResults = useSelector(
    (state: SearchResultsState) => state.searchResults,
  );
  const handleClick = (city: SearchResultsInterface) => {
    console.log(city);
  };

  const renderSuggestions = () => {
    if (searchResults.length !== 0) {
      return searchResults.map((city) => (
        <button
          key={city.id}
          className="lg:h-10 w-full hover:bg-btn-hover font-custom-regular text-text text-lg text-left px-3"
          onClick={() => handleClick(city)}
        >
          {city.name}
        </button>
      ));
    }
    return (
      <div className="lg:h-10 w-full flex items-center text-text text-lg text-left px-3">
        Not found
      </div>
    );
  };

  return (
    <div className="absolute top-full z-3 w-full h-fit mt-3 bg-item-bg border border-border flex flex-col">
      {renderSuggestions()}
    </div>
  );
};

export default SearchSuggestions;
