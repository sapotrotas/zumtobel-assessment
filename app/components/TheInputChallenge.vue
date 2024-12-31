<script setup>
import { useChallengeQuery } from '../../composables/challenge'

const emit = defineEmits(["newData"])

const { challengeInput, error } = await useChallengeQuery()
const inputArr = challengeInput.value?.input.split(/\n/)

if (inputArr) {
  emit('newData', inputArr)
}
</script>

<template>
  <!-- <div v-if="isUserChallenge">
    session cookie used = {{ aocSessionCookie }}
  </div>
  <br> -->
  
  <!-- 
  TODO: collapsible component
  -->
  <div v-if="error">
    <div v-if="error.statusCode === 500">
      There was an error fetching data. Is the session id correct? 
    </div>
    <div v-else>
      {{ error.data }}
    </div>
  </div>
  <div v-else>
    <div v-for="input in inputArr">
      {{ input }}
    </div>
  </div>
</template>