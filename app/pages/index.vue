<script setup>
const aocSessionCookie = useCookie('session')
const inputMethod = useCookie('inputMethod')

const showNavigation = computed(() => {
  return inputMethod.value === inputMethodType.FILE || aocSessionCookie.value
})
</script>

<template>
  <div class="app-panel">
    <h1 class="text-2xl text-center font-bold m-6 ">
      Welcome
    </h1>

    <InputMethod :show-instructions="true" />

    <div v-if="showNavigation">
      <div class="home-nav flex justify-center items-center gap-x-6">
        <AppNavigation />
      </div>
    </div>
  </div>
</template>
