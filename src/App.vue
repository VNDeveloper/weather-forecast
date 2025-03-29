<script setup lang="ts">
import CountrySearchBar from '@/components/CountrySearchBar.vue';
</script>

<template>
  <div class="header">
    <CountrySearchBar />
  </div>

  <div class="content">
    <h1>Weather App</h1>
    <p>Find out the weather in your country.</p>
  </div>

  <div class="footer">
    <p>&copy; 2023 Weather App</p>
  </div>


</template>

<style lang="scss">
.header {
  position: absolute;
  top: 0;
  left: 10px;
  width: 50%;
}


</style>
