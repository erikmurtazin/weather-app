import { useEffect, useState } from 'react';
import iconSearch from '../assets/images/icon-search.svg';
import { useSearch } from '../hooks/useSearch';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../slices/searchSlice';
import SearchSuggestions from './SearchSuggestions';
import {
  setSearchResults,
  type SearchResultsInterface,
} from '../slices/searchResultsSlice';
const Search = () => {
  interface SearchState {
    search: string;
  }
  interface SearchResultsState {
    searchResults: SearchResultsInterface[];
  }

  const search = useSelector((state: SearchState) => state.search);
  const searchResults = useSelector(
    (state: SearchResultsState) => state.searchResults,
  );

  const [debouncedSearch, setDebouncedSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const resp = useSearch(debouncedSearch);
  const results = resp?.data?.data.results;

  useEffect(() => {
    dispatch(setSearchResults(results));
  }, [results, dispatch]);
  console.log(searchResults);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className="w-full md:max-w-120 relative">
      <div className="flex items-center h-12  bg-item-bg rounded-2xl px-4">
        <img src={iconSearch} alt="search" className="mr-1 w-6 h-6" />
        <input
          name="search"
          className="text-text font-custom-regular text-xl w-full p-3"
          type="text"
          placeholder="Search for a place"
          onChange={handleChange}
        />
      </div>
      <SearchSuggestions />
    </div>
  );
};

export default Search;
