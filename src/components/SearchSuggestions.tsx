import { useDispatch, useSelector } from 'react-redux';
import type { SearchResultsState } from '../slices/searchResultsSlice';
import type { RootState } from '../store';
import { setCity } from '../slices/citySlice';
import { setSearch } from '../slices/searchSlice';

// Dropdown menu that displays location results based on user input
const SearchSuggestions = () => {
  const dispatch = useDispatch();

  // Retrieve the list of potential cities from the global store
  const searchResults = useSelector((state: RootState) => state.searchResults);

  /**
   Updates global city state to trigger new weather fetches.
   Clears the search input field.
   Syncs the selection to localStorage for persistence across sessions.
   @param city The selected city object from the search results.
   */
  const handleClick = (city: SearchResultsState) => {
    dispatch(setCity(city));
    dispatch(setSearch(''));
    localStorage.removeItem('city');
    localStorage.setItem('city', JSON.stringify({ id: city.id }));
  };

  /**
   * Generates the list of suggestion buttons.
   * Returns a 'Not found' message if the API call returned an empty set.
   */
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
