<script setup>
 const props = defineProps({
  title: String,
  expanded: {
    type: Boolean,
    default: false
  }
})

const isExpanded = ref(props.expanded)
</script>

<template>
  <div class="w-full flex flex-col">
    <button @click="isExpanded = !isExpanded" class="collapsible__button" type="button">
      <span>{{ title }}</span>
    </button>

    <!-- TODO: animation? transition-[height] duration-300 ease-out v-enter-to-->
    <div :class="{ collapse: !isExpanded }" class="block w-full basis-full overflow-hidden">
      <div class="text-sm text-gray-500 p-1.5 pb-3">
        <slot />
      </div>
    </div>
  </div>
</template>