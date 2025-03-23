<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { WeatherService } from './services/WeatherService';
import type { Ref } from 'vue'
import tryCatch from '@/utils/try-catch';

const weatherService = new WeatherService();

const weatherData: Ref<Array<any> | null> = ref(null);
// Replace 'any' with a specific type if you know the structure of the weather data.
const weatherIsLoading: Ref<boolean> = ref(false);
const weatherError: Ref<Error | null> = ref(null);

onBeforeMount(async () => {
  weatherIsLoading.value = true;

  const { data, error } = await tryCatch(weatherService.getCurrentWeatherData(38.8951, -77.0364));

  weatherData.value = data as any[] | null;
  weatherError.value = error as Error | null;

  weatherIsLoading.value = false;
});
</script>

<template>
  <div>
    {{ weatherData }}
  </div>
</template>

<style scoped>
</style>
