import { it, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import Challenge1 from '~/pages/challenge-1.vue'

const inputData = [
  '3   4',
  '4   3',
  '2   5',
  '1   3',
  '3   9',
  '3   3'
]

describe('Challenge 1', () => {
  it('solve challenge day 1', async () => {
    const component = await mount(Challenge1)

    component.vm.solveChallenge(inputData)

    expect(component.vm.distance).toBe(11)
    expect(component.vm.similarity).toBe(27)
  })
})
