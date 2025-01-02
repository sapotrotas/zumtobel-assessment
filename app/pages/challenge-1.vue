<script setup>
definePageMeta({
  id: 1
})

const isUserChallenge = useCookie('isUserChallenge')
const aocSessionCookie = useCookie('session')

const distance = useState('distance', () => 0)
const similarity = useState('similarity', () => 0)

function solveChallenge(data) {
  distance.value = 0
  similarity.value = 0

  const arr = data.map(row => row.split('  '))
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
  <InputMethod />
  <br>
  
  <div v-if="isUserChallenge && aocSessionCookie">
    input using session
  </div>

  <div v-if="isUserChallenge && !aocSessionCookie">
    missing session id
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
</template>