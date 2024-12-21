<script setup>
import { computed } from 'vue';
import { useChallengeQuery } from '../../composables/challenge'

definePageMeta({
  id: 1
})


//const queryCache = useQueryCache()
// TODO...dynamic id
//const inputData = queryCache.getQueryData(['challengeInput', 1])

const route = useRoute()

const { challengeInput } = await useChallengeQuery(route.meta.id)

const result = computed(() => {
  const arr = challengeInput.value.split(/\r?\n/).map(row => row.split('  '))
  arr.pop()

  const left = arr.map(([leftItem]) => +leftItem).sort()
  const right = arr.map(([,rightItem]) => +rightItem).sort()

  // part 1
  let distance = 0
  for (let i = 0; i < left.length -1; i++) {
    distance += Math.abs(right[i] - left[i])
  }

  // part 2
  let similarity = 0
  for (let i = 0; i < left.length -1; i++) {
    const number = left[i]
    const firstIdx = right.indexOf(number)
    if (firstIdx === -1) {
      continue
    }

    const lastIdx = right.lastIndexOf(number)
    const occurrences = (lastIdx - firstIdx + 1)
    similarity += occurrences * number
  }

  return { 
    distance, 
    similarity
  }
})

</script>

<template>

<!-- TODO: use slot here for input part - collapsible component
  {{ challengeInput }}
 -->
 
 <!-- output part-->
  <p>distance: {{ result.distance }}</p>
  <p>similarity: {{ result.similarity }}</p>

</template>