import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface CityData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  error?: string;
}

interface CityState {
  data: CityData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CityState = {
  data: null,
  status: 'idle',
  error: null,
};

const isCityValid = (obj: any): obj is CityData => {
  return obj && typeof obj.id === 'number';
};

export const fetchCityById = createAsyncThunk<
  CityData | null,
  void,
  { rejectValue: string }
>('City/fetchCityById', async (_, { rejectWithValue }) => {
  const item = localStorage.getItem('city');
  if (!item) return null;
  let parsed: any;

  try {
    parsed = JSON.parse(item);
  } catch {
    return rejectWithValue('Error parsing local storage');
  }

  if (!isCityValid(parsed)) {
    return rejectWithValue('Invalid data found in local storage');
  }

  try {
    const { id } = parsed;
    const url = `https://geocoding-api.open-meteo.com/v1/get?id=${id}`;
    const response = await axios.get<CityData>(url);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err);
      if (err.response) {
        return rejectWithValue(err.response.data.reason);
      }
      if (err.request) {
        return rejectWithValue('Network error');
      }
    }
    return rejectWithValue('Unknonw error');
  }
});

export const CitySlice = createSlice({
  name: 'City',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<CityData | null>) {
      state.data = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    clearErrorCityState(state) {
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCityById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCityById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { setCity, clearErrorCityState } = CitySlice.actions;
export default CitySlice.reducer;
