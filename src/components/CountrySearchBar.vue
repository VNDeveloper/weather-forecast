<!--
  @name CountrySearchBar.vue
  @description A Vue component for searching countries and displaying their weather information.
-->
<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';

import SVGIconLibrary from '@/components/SVGIconLibrary.vue';

const searchInputText: Ref<string> = ref('');

watch(searchInputText, (newValue) => {
  console.log('Search input changed test:', newValue);
});
</script>
<template>
  <div class="input-container">
    <SVGIconLibrary icon="location-pin" class="input-container__icon" />
    <input
      class="input-container__input"
      type="text"
      v-model="searchInputText"
      placeholder="Enter country name"
    />
  </div>
  
</template>
<style scoped lang="scss">
.input-container {
  position: relative;

  &__icon {
    position: absolute;
    left: 10px; /* Adjust the position of the icon */
    top: 50%;
    transform: translateY(-50%);
    color: #999; /* Icon color */

    ::deep(svg) {
      width: 50px; /* Icon size */
      height: 50px; /* Icon size */
    }
  }

  &__input {
    padding: 10px 10px 10px 40px; /* Add padding to the left for the icon */
    width: 100%;
    border: none;
    outline: none;
    transition: border-color 0.3s;
    background-color: transparent;
    font-size: 1.8rem;

    &:focus {
      border-color: #007bff; /* Change border color on focus */
    }
  }
}

</style>