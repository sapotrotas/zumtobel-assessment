<script setup>
definePageMeta({
  id: 1
})

const distance = useState('distance', () => 0)
const similarity = useState('similarity', () => 0)

function solveChallenge(data) {
  distance.value = 0
  similarity.value = 0
  
  const arr = data.split(/\r?\n/).map(row => row.split('  '))
  arr.pop()

  const left = arr.map(([leftItem]) => +leftItem).sort()
  const right = arr.map(([, rightItem]) => +rightItem).sort()

  // part 1
  for (let i = 0; i < left.length - 1; i++) {
    distance.value += Math.abs(right[i] - left[i])
  }

  // part 2
  for (let i = 0; i < left.length - 1; i++) {
    const number = left[i]
    const firstIdx = right.indexOf(number)
    if (firstIdx === -1) {
      continue
    }

    const lastIdx = right.lastIndexOf(number)
    const occurrences = (lastIdx - firstIdx + 1)
    similarity.value += occurrences * number
  }
}
</script>

<template>
  <TheInputChallenge @new-data="solveChallenge" />

  <!-- output TODO-->
  <ClientOnly>
    <div v-if="distance && similarity">
      Results
      <p>distance: {{ distance }}</p>
      <p>similarity: {{ similarity }}</p>
    </div>
  </ClientOnly>


  <!--
<NuxtClientFallback>
  
this is a fallback - there was an error calling AOC API
{{ state.error }}
   
  </NuxtClientFallback>
-->
</template>