<script setup>
const inputMethod = useCookie('inputMethod')
const aocSessionCookie = useCookie('session')

const sessionid = useState('sessionid', () => aocSessionCookie.value || '')

const setsession = () => {
  aocSessionCookie.value = sessionid.value
}
</script>

<template>
  <div>
    <h2 class="text-base mb-2">
      Select the input method:
    </h2>
    <div class="flex justify items-center gap-x-4 ">
      <button
        :class="{ 'app__button--selected': inputMethod === 'session' }"
        class="app__button"
        @click="inputMethod = 'session'"
      >
        AoC Session
      </button>
      <button
        :class="{ 'app__button--selected': inputMethod === 'file' }"
        class="app__button"
        @click="inputMethod = 'file'"
      >
        File
      </button>
    </div>
  </div>
  <div
    v-if="inputMethod === 'session'"
    class="mt-4"
  >
    <label
      for="sessionId"
      class="text-sm"
    >
      Advent of Code session:
    </label>
    <div
      class="flex rounded-md pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-gray-400"
    >
      <input
        id="sessionId"
        v-model="sessionid"
        name="sessionId"
        type="text"
        autocomplete="off"
        class="block min-w-0 grow py-1.5 pl-1 pr-3 text-sm text-gray-900 focus:outline focus:outline-0 sm:text-sm/6"
      >
      <button
        v-if="sessionid"
        class="appearance-none rounded-full py-1.5 pl-3 pr-3 text-base text-gray-600 sm:text-sm/6"
        @click="sessionid = null; aocSessionCookie = null"
      >
        X
      </button>
    </div>
    <button
      v-if="sessionid"
      class="app__button w-full mt-2"
      @click="setsession"
    >
      Set
    </button>
  </div>
</template>
