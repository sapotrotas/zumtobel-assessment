<script setup>
definePageMeta({
  id: 3
})

const part1Sum = useState('part1safe', () => 0)
const part2Sum = useState('part2safe', () => 0)

function solveChallenge(data) {
  // part 1
  let pattern = /mul\(\d{1,3},\d{1,3}\)/g
  let sections = data.match(pattern)

  part1Sum.value = sumMulSections(sections)

  // part 2
  pattern = /don't\(\)|do\(\)|mul\(\d{1,3},\d{1,3}\)/g
  sections = data.match(pattern)

  // remove everything between don't and do
  let isEnable = true
  for (let i = 0; i < sections.length; i++) {
    isEnable = sections[i] === `don't()` ? false : isEnable
    isEnable = sections[i] === `do()` ? true : isEnable

    if (!isEnable || sections[i] === 'do()') {
      sections[i] = null
    }
  }
  sections = sections.filter(n => n !== null)

  part2Sum.value = sumMulSections(sections)
}

const sumMulSections = (sections) => {
  return sections.reduce((acc, section) => {
    const pattern = /\d{1,3}/g
    const factors = section.match(pattern)

    return acc += factors[0] * factors[1]
  }, 0)
}

</script>

<template>
  <!-- results -->
  <ClientOnly>
    <div v-if="part1Sum && part2Sum">
      Results
      <p>part 1 sum: {{ part1Sum }}</p>
      <p>part 2 sum: {{ part2Sum }}</p>
    </div>
  </ClientOnly>

  <TheInputChallenge @new-data="solveChallenge" />
</template> 