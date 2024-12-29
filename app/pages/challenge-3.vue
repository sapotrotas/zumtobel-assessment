<script setup>
definePageMeta({
  id: 3
})

const part1Sum = useState('part1safe', () => 0)

// part 1
function solveChallenge(data) {
  const pattern = /mul\(\d{1,3},\d{1,3}\)/g
  const sections = data.match(pattern)
  // console.log('sections = ', sections)

  part1Sum.value = sections.reduce((acc, section) => {
    const pattern = /\d{1,3}/g
    const factors = section.match(pattern)

    return acc += factors[0] * factors[1]
  }, 0)

}
</script>

<template>

    <!-- results -->
    <ClientOnly>
    <div v-if="part1Sum">
      Results
      <p>part 1 sum: {{ part1Sum }}</p>
    </div>
  </ClientOnly>

  <TheInputChallenge @new-data="solveChallenge"/>
</template> 