import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SearchResultsInterface {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const initialState: SearchResultsInterface[] = [];

export const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    setSearchResults(
      _,
      action: PayloadAction<SearchResultsInterface[] | undefined>,
    ) {
      return action.payload ?? [];
    },
  },
});

export const { setSearchResults } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
