<script setup>
const inputMethod = useCookie('inputMethod')
const aocSessionCookie = useCookie('session')

const sessionid = useState('sessionid', () => aocSessionCookie.value || '')

const props = defineProps({
  showInstructions: Boolean,
  default: false
})

const setsession = () => {
  aocSessionCookie.value = sessionid.value
}

const clearSession = () => {
  sessionid.value = null; 
  aocSessionCookie.value = null
}

watch(sessionid, () => {
  if (!sessionid.value) {
    aocSessionCookie.value = null
  }
})
</script>

<template>
  <div>
    <h2 class="text-base mb-2">
      Select the input method:
    </h2>
    <div class="flex justify items-center gap-x-4 ">
      <button
        :class="{ 'app__button--selected': inputMethod === inputMethodType.SESSION }"
        class="app__button"
        @click="inputMethod = inputMethodType.SESSION"
      >
        AoC Session
      </button>
      <button
        :class="{ 'app__button--selected': inputMethod === inputMethodType.FILE }"
        class="app__button"
        @click="inputMethod = inputMethodType.FILE"
      >
        File
      </button>
    </div>
  </div>
  <div
    v-if="inputMethod === inputMethodType.SESSION"
    class="mt-4"
  >
    <div 
      v-if="showInstructions"
      class="text-sm mb-4"
    >
      <p>1. Login in Advent of Code website</p>
      <p>2. Copy Session id from cookies using developer tools</p>
      <p>3. Paste here and press Set</p>
    </div>
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
        @click="clearSession"
        
      >
      <!-- @click="sessionid = null; aocSessionCookie = null" -->
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
