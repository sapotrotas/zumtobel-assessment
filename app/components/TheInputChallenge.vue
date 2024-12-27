<script setup>
import { useChallengeQuery } from '../../composables/challenge'

const route = useRoute()
const emit= defineEmits(["newData"])

const { challengeInput, state } = await useChallengeQuery(route.meta.id)

watch(challengeInput, () => {
  emit('newData', challengeInput.value)
})
</script>

<template>

  <!-- 
  TODO: collapsible component
-->

  <div v-if="!state.error">
  {{ challengeInput }}
  </div>

  <div v-if="state.error">
  {{ state.error }}
  </div>
</template>