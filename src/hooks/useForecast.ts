import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Units } from '../slices/unitsSlice';

export const useForecast = (
  units: Units,
  latitude?: number,
  longitude?: number,
) => {
  const enabled = latitude != null && longitude != null;
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    hourly: 'temperature_2m,weather_code',
    current:
      'temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code,apparent_temperature',
    timezone: 'auto',
    ...units,
  }).toString();

  const forecastURL = `https://api.open-meteo.com/v1/forecast?${params}`;
  const result = useQuery({
    queryKey: ['forecast', forecastURL],
    queryFn: async () => await axios.get(forecastURL),
    enabled,
  });

  return result;
};
