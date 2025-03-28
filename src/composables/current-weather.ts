/**
 * @name useCurrentWeather
 * @description Composable to fetch current weather data
 * @returns {Object} - An object containing weather data and loading state
 * @example
 * const { data, loading, error } = useCurrentWeather();
 */
import { ref, onBeforeMount, type Ref } from 'vue';
import tryCatch from '@/utils/try-catch';
import { WeatherService } from '@/services/WeatherService';

export function useCurrentWeather(lat:number = 0, lon:number = 0) {
  const data:Ref<any | null> = ref(null);
  const error:Ref<Error | null> = ref(null);
  const latitude:Ref<number> = ref(0);
  const longitude:Ref<number> = ref(0);

  const apiKey:Ref<string> = ref(import.meta.env.VITE_WEATHER_API_KEY as string);
  const apiUrl:Ref<string> = ref(import.meta.env.VITE_BASE_API_URL as string);

  const weatherService = new WeatherService();

  /**
   * Fetch 
   */
  const fetchCurrentWeatherData = async () => {
    const { success, data: weatherData, error: fetchError } = await tryCatch(
      weatherService.getCurrentWeatherData(latitude.value, longitude.value)
    );
    if (success) {
      data.value = weatherData;
      error.value = null;
    } else {
      data.value = null;
      error.value = fetchError;
    }
  };

  onBeforeMount(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude.value = position.coords.latitude;
          longitude.value = position.coords.longitude;
          fetchCurrentWeatherData();
        },
        (e) => {
          console.error('Error getting location:', e);
          error.value = new Error('Unable to retrieve location');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      error.value = new Error('Geolocation is not supported by this browser.');
    }         
  })
  return {
    data,
    error,
    loading: !data.value && !error.value,
    fetchCurrentWeatherData
  };
}