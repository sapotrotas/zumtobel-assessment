<script setup>
const aocSessionCookie = useCookie('session')
</script>

<template>
  <div class="text-center ring-1 bg-white ring-gray-200 rounded-lg shadow-md p-2 md:p-4 lg:p-8">
    <h1 class="text-3xl font-bold m-6">
      Welcome
    </h1>

    <InputMethod />
    
    <!-- TODO add instructions -->
    <div v-if="aocSessionCookie">
      <div class="home-nav flex justify-between items-center gap-x-6 h-14 md:h-20 lg:h-28 mt-6">
        <Navigation />
      </div>
    </div>
  </div>
</template>