<script setup>
definePageMeta({
  id: 3
})

const part1Sum = useState('part1sum', () => 0)
const part2Sum = useState('part2sum', () => 0)

function solveChallenge(data) {
  part1Sum.value = 0
  part2Sum.value = 0

  if (!data || !data.length) {
    return
  }

  // part 1
  let pattern = /mul\(\d{1,3},\d{1,3}\)/g
  let sections = data.toString().match(pattern)

  part1Sum.value = sumMulSections(sections)

  // part 2
  pattern = /don't\(\)|do\(\)|mul\(\d{1,3},\d{1,3}\)/g
  sections = data.toString().match(pattern)

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
  <CollapsiblePanel :title="'Input Method'">
    <InputMethod />
  </CollapsiblePanel>

  <CollapsiblePanel
    :title="'Challenge Results'"
    :expanded="true"
  >
    <ClientOnly>
      <div>
        <span class="font-bold">part 1 sum: </span>
        <span v-if="part1Sum">{{ part1Sum }}</span>
      </div>
      <div>
        <span class="font-bold">part 2 sum: </span>
        <span v-if="part2Sum">{{ part2Sum }}</span>
      </div>
    </ClientOnly>
  </CollapsiblePanel>

  <CollapsiblePanel :title="'Challenge input'">
    <ChallengeInput @new-data="solveChallenge" />
  </CollapsiblePanel>
</template>
