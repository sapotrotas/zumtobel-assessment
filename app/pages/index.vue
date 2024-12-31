<script setup>
const isUserChallenge = useCookie('isUserChallenge')
const aocSessionCookie = useCookie('session')
</script>

<template>
  <div class="text-center ring-1 bg-white ring-gray-200 rounded-lg shadow-md p-2 md:p-4 lg:p-8">
    <h1 class="text-3xl font-bold m-6">
      Welcome
    </h1>
    <div class="my-6">
      <h2 class="text-lg m-6">
        Choose an input method
      </h2>
      <div class="flex justify-center items-center gap-x-6 mb-4">
        <button @click="isUserChallenge = true" class="app-btn text-white bg-green-700 hover:bg-green-800">
          AoC Session
        </button>
        <button @click="isUserChallenge = false" class="app-btn text-white bg-green-700 hover:bg-green-800">
          File
        </button>
      </div>
    </div>
    <div v-if="isUserChallenge">

      <!-- TODO add instructions here -->
      <!-- TODO... create component -->
      <label for="sessionId" class="text-lg">Advent of Code session: </label>
      <div
        class="flex rounded-md pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-gray-400">
        <input type="text" name="sessionId" id="sessionId" autocomplete="off" v-model="aocSessionCookie"
          class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 focus:outline focus:outline-0 sm:text-sm/6">
        <button v-if="aocSessionCookie" @click="aocSessionCookie = null"
          class="appearance-none rounded-full py-1.5 pl-3 pr-3 text-base text-gray-600 sm:text-sm/6">X</button>
      </div>

      <div v-if="aocSessionCookie">
        <div class="home-nav flex justify-between items-center gap-x-6 h-14 md:h-20 lg:h-28 mt-6">
          <Navigation />
        </div>
      </div>

    </div>
</div></template>