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
    <button
      type="button"
      class="collapsible__button"
      @click="isExpanded = !isExpanded"
    >
      <span>{{ title }}</span>
    </button>
    <div
      :class="{ collapse: !isExpanded }"
      class="block w-full basis-full overflow-hidden"
    >
      <div class="text-sm text-gray-500 p-1.5 pb-3">
        <slot />
      </div>
    </div>
  </div>
</template>
