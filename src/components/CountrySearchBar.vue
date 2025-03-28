<!--
  @name CountrySearchBar.vue
  @description A Vue component for searching countries and displaying their weather information.
-->
<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';

const searchInputText: Ref<string> = ref('');

watch(searchInputText, (newValue) => {
  console.log('Search input changed:', newValue);
});
</script>
<template>
  <input
    class="country-search-bar"
    type="text"
    v-model="searchInputText"
    placeholder="Enter country name"
  />
</template>
<style scoped>
.country-search-bar {
  width: 100%;
  padding: 10px;
  font-size: 25px;
  border: none;
  border-bottom: 2px solid white;
  background-color: transparent;
  color: white;
  outline: none;
}
</style>