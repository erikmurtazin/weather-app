import { useDispatch, useSelector } from 'react-redux';
import type { SearchResultsState } from '../slices/searchResultsSlice';
import type { RootState } from '../store';
import { setSelectedCity } from '../slices/selectedCity';
import { setSearch } from '../slices/searchSlice';

const SearchSuggestions = () => {
  const dispatch = useDispatch();

  const searchResults = useSelector((state: RootState) => state.searchResults);

  const handleClick = (city: SearchResultsState) => {
    dispatch(setSelectedCity(city));
    dispatch(setSearch(''));
  };

  const renderSuggestions = () => {
    if (searchResults.length !== 0) {
      return searchResults.map((city) => (
        <button
          key={city.id}
          className="h-15 w-full hover:bg-btn-hover font-custom-regular text-text text-lg text-left px-3"
          onClick={() => handleClick(city)}
        >
          {city.name}
        </button>
      ));
    }
    return (
      <div className="h-15 w-full flex items-center text-text text-lg text-left px-3">
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
