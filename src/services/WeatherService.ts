import api from './api';

export class WeatherService {
  async getCurrentWeatherData(lat: number, lon: number, ) {
    return api.get(`weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
  }

  async getHoulyFourDaysForecast(lat: number, lon: number) {
    return api.get(`forecast/hourly?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
  }
}
