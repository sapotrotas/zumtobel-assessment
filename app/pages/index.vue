<script setup>
const isUserChallenge = useCookie('isUserChallenge')
const aocSessionCookie = useCookie('session')
</script>

<template>
  <div>
    Choose method:
    <br>
    <button @click="isUserChallenge = true">Session</button>
    <button @click="isUserChallenge = false">File</button>
  </div>
  <div v-if="isUserChallenge">
    <label for="sessionId">Advent of code session: </label>
    <input type="text" name="sessionId" autocomplete="off" v-model="aocSessionCookie">
    <button @click="aocSessionCookie = null">X</button>

    <div v-if="aocSessionCookie">
      choose challenge...
    </div>
  </div>
</template>