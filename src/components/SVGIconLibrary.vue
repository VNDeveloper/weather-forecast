<!--
  @name SVGIconLibrary.vue
  @overview this is a vue component that loads SVG icons dynamically based on the icon name passed as props.

  All the svg icons are expected to be store in the assets/icons directory.
-->
<script setup lang="ts">
import { watch, ref } from 'vue'
import type { Ref } from 'vue'

const iconList = [
  'location-pin',
]

// Define the type for the icon name
type IconName = typeof iconList[number]

const props = defineProps({
  icon: {
    type: String as () => IconName,
    required: true,
  },
  customClass: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '25px',
  },
  height: {
    type: String,
    default: '25px',
  },
})

const svgContent: Ref<string> = ref('')

/**
 * Get the SVG icon content based on the icon name. This function will dynamically import the SVG file from the assets/icons directory.
 *
 * @param iconName - The name of the icon to load (without the .svg extension).
 * @returns A promise that resolves to the SVG content as a string.
 * @throws Will throw an error if the icon cannot be loaded.
 */
const getSVGIcon = async (iconName: IconName) => {
  try {
    // Dynamically import the SVG icon based on the icon name
    const response = await import(`@/assets/icons/${iconName}.svg`)

    const responseDefault = await fetch(response.default)
    const text = await responseDefault.text()

    return text
  } catch (error) {
    console.error(`Error loading icon: ${iconName}`, error)
    return ''
  }
}

/**
 * Watch for changes to the icon prop and update the SVG content accordingly.
 * If the icon is not found, log an error message and set svgContent to an empty string.
 */
watch(() => props.icon, async (newIcon) => {
  if (iconList.includes(newIcon as IconName)) {
    const svg = await getSVGIcon(newIcon as IconName)
    svgContent.value = svg
  
    if (!svg) {
      console.error(`SVG content not found for icon: ${newIcon}`)
      svgContent.value = ''
    }
  } else {
    console.error(`Icon not found: ${newIcon}`)
    svgContent.value = ''
  }
}, { immediate: true })

</script>
<template>
  <svg v-if="svgContent" v-html="svgContent" :class="customClass" :width="width" :height="height"></svg>
</template>
<style scoped lang="scss"></style>