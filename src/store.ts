import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import searchResultsReducer from './slices/searchResultsSlice';
export default configureStore({
  reducer: {
    search: searchReducer,
    searchResults: searchResultsReducer,
  },
});
