import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import searchResultsReducer from './slices/searchResultsSlice';
import forecastReducer from './slices/forecastSlice';
import selectedCity from './slices/citySlice';
import unitsReduser from './slices/unitsSlice';
const store = configureStore({
  reducer: {
    search: searchReducer,
    searchResults: searchResultsReducer,
    forecast: forecastReducer,
    selectedCity: selectedCity,
    units: unitsReduser,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
