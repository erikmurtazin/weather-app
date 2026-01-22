import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SelectedCityState {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

export const selectedCitySlice = createSlice({
  name: 'selectedCity',
  initialState: null as SelectedCityState | null,
  reducers: {
    setSelectedCity(_, action: PayloadAction<SelectedCityState | null>) {
      return action.payload;
    },
  },
});

export const { setSelectedCity } = selectedCitySlice.actions;
export default selectedCitySlice.reducer;
