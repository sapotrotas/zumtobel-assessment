import { it, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import Challenge3 from '~/pages/challenge-3.vue'

const inputData1 = ['xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))']
const inputData2 = [`xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`]

describe('Challenge 3', () => {
  it('solve challenge day 3', async () => {
    const component = await mount(Challenge3)

    component.vm.solveChallenge(inputData1)
    expect(component.vm.part1Sum).toBe(161)

    component.vm.solveChallenge(inputData2)
    expect(component.vm.part2Sum).toBe(48)
  })
})
