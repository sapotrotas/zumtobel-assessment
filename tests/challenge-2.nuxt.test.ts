import { it, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import Challenge2 from '~/pages/challenge-2.vue'

const inputData = [
  '7 6 4 2 1',
  '1 2 7 8 9',
  '9 7 6 2 1',
  '1 3 2 4 5',
  '8 6 4 4 1',
  '1 3 6 7 9'
]

describe('Challenge 2', () => {
  it('solve challenge day 2', () => {
    const component = mount(Challenge2)

    component.vm.solveChallenge(inputData)

    expect(component.vm.part1Safe).toBe(2)
    expect(component.vm.part2Safe).toBe(4)
  })
})
