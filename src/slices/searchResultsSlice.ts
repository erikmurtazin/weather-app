import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SearchResultsState {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

const initialState: SearchResultsState[] = [];

export const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    setSearchResults(
      _,
      action: PayloadAction<SearchResultsState[] | undefined>,
    ) {
      return action.payload ?? [];
    },
  },
});

export const { setSearchResults } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
