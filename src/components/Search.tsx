import { useEffect, useState } from 'react';
import iconSearch from '../assets/images/icon-search.svg';
import { useSearch } from '../hooks/useSearch';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../slices/searchSlice';
import SearchSuggestions from './SearchSuggestions';
import { setSearchResults } from '../slices/searchResultsSlice';
import type { RootState } from '../store';
import { notyf } from '../utils/notifications';

// Implements debouncing to limit API calls while the user is typing
const Search = () => {
  const search = useSelector((state: RootState) => state.search);
  // Local state to hold the 'debounced' version of the search string
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const dispatch = useDispatch();

  /**
   * Debounce Logic:
   * Wait 500ms after the last keystroke before updating 'debouncedSearch'.
   * This prevents excessive API requests to the API.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    // Cancel the timer if the user types again within the 500ms window
    return () => clearTimeout(timer);
  }, [search]);

  const resp = useSearch(debouncedSearch);

  // Display an error toast if the search API fails
  useEffect(() => {
    if (resp.isError) {
      notyf.error(resp.error.message);
    }
  }, [resp.isError, resp.error]);

  const results = resp?.data?.data.results;

  // Update the global searchResults store whenever the API returns new data
  useEffect(() => {
    dispatch(setSearchResults(results));
  }, [results, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className="w-full md:max-w-120 relative">
      <div className="flex items-center h-14  bg-item-bg rounded-2xl px-4">
        <img src={iconSearch} alt="search" className="mr-1 w-6 h-6" />
        <input
          name="search"
          className="text-text font-custom-regular text-xl w-full p-3"
          type="text"
          placeholder="Search for a place"
          onChange={handleChange}
          value={search}
        />
      </div>
      {search.length > 1 && <SearchSuggestions />}
    </div>
  );
};

export default Search;
