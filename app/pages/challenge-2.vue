<script setup>
definePageMeta({
  id: 2
})

const part1Safe = useState('part1safe', () => 0)
const part2Safe = useState('part2safe', () => 0)

function solveChallenge(data) {
  part1Safe.value = 0
  part2Safe.value = 0

  const arr = data.map(row => row.split(' ').map(Number))

  arr.forEach((row) => {
    if (row.length < 3 || Number(isRowSafe(row))) {
      // part 1 - initial row is safe
      ++part1Safe.value
    }
    else {
      // part 2 - recreate row by removing one index each step
      for (let i = 0; i < row.length; i++) {
        const changedRow = row.slice(0, i).concat(row.slice(i + 1))
        if (changedRow.length < 3 || Number(isRowSafe(changedRow))) {
          ++part2Safe.value
          break
        }
      }
    }
  })

  // part 2 answer
  part2Safe.value += part1Safe.value
}

const isRowSafe = (row) => {
  const sign = Math.sign(row[1] - row[0]) // +1 increasing, -1 decreasing
  const pairs = pairsArray(row)

  const safePairs = pairs.reduce((acc, pair) => {
    return acc += Number(isSafePair(pair, sign))
  }, 0)

  return safePairs === pairs.length
}

const isSafePair = (pair, sign) => {
  return Math.abs(pair[1] - pair[0]) >= 1
    && Math.abs(pair[1] - pair[0]) <= 3
    && Math.sign(pair[1] - pair[0]) === sign
}

const pairsArray = (arr) => {
  let pairs = []
  for (let i = 1; i < arr.length; i++) {
    pairs.push([arr[i - 1], arr[i]])
  }

  return pairs
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
        <span class="font-bold">part 1 safe reports: </span>
        <span v-if="part1Safe">{{ part1Safe }}</span>
      </div>
      <div>
        <span class="font-bold">part 2 safe reports: </span>
        <span v-if="part2Safe">{{ part2Safe }}</span>
      </div>
    </ClientOnly>
  </CollapsiblePanel>

  <CollapsiblePanel :title="'Challenge input'">
    <ChallengeInput @new-data="solveChallenge" />
  </CollapsiblePanel>
</template>
