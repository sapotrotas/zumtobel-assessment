<script setup>
definePageMeta({
  id: 1
})

// TODO... improve this part - no need to have this logic here
const isUserChallenge = useCookie('isUserChallenge')
const aocSessionCookie = useCookie('session')

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
  <div v-if="isUserChallenge && aocSessionCookie">
    input using session
  </div>

  <div v-if="isUserChallenge && !aocSessionCookie">
    missing session id
  </div>

  <div v-if="!isUserChallenge || !aocSessionCookie">
    input using file
  </div>
  <br>
  <!-- output TODO-->
  <ClientOnly>
    <div v-if="distance && similarity">
      Results
      <p>distance: {{ distance }}</p>
      <p>similarity: {{ similarity }}</p>
    </div>
  </ClientOnly>

  <TheInputChallenge @new-data="solveChallenge" />

  <!-- TODO... do I really need this for CSR? -->
  <!--
  <NuxtClientFallback>
    client fallback error - there was an error calling AOC API
    <br>
    {{ state.error }}
  </NuxtClientFallback>
  -->
</template>