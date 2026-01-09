import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useSearch = (search: string) => {
  const params = new URLSearchParams({
    name: search,
    count: String(10),
    language: 'en',
    format: 'json',
  }).toString();

  const searchURL = `https://geocoding-api.open-meteo.com/v1/search?${params}`;

  const result = useQuery({
    queryKey: ['search', searchURL],
    queryFn: async () => await axios.get(searchURL),
    enabled: !!search,
  });

  return result;
};
