import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import searchResultsReducer from './slices/searchResultsSlice';
import forecastReducer from './slices/forecastSlice';
import selectedCity from './slices/selectedCity';
const store = configureStore({
  reducer: {
    search: searchReducer,
    searchResults: searchResultsReducer,
    forecast: forecastReducer,
    selectedCity: selectedCity,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
