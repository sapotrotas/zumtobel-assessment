<script setup>
definePageMeta({
  id: 1
})

const distance = useState('distance', () => 0)
const similarity = useState('similarity', () => 0)

function solveChallenge(data) {
  distance.value = 0
  similarity.value = 0

  const arr = data.map(row => row.split('  '))

  const left = arr.map(([leftItem]) => +leftItem).sort()
  const right = arr.map(([, rightItem]) => +rightItem).sort()

  // part 1
  for (let i = 0; i < left.length; i++) {
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
  <CollapsiblePanel :title="'Input Method'">
    <InputMethod />
  </CollapsiblePanel>

  <CollapsiblePanel
    :title="'Challenge Results'"
    :expanded="true"
  >
    <ClientOnly>
      <div>
        <span class="font-bold">distance: </span>
        <span v-if="distance">{{ distance }}</span>
      </div>
      <div>
        <span class="font-bold">similarity: </span>
        <span v-if="similarity">{{ similarity }}</span>
      </div>
    </ClientOnly>
  </CollapsiblePanel>

  <CollapsiblePanel :title="'Challenge input'">
    <ChallengeInput @new-data="solveChallenge" />
  </CollapsiblePanel>
</template>
