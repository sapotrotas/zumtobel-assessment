<!-- <script setup>
const queryCache = useQueryCache()
const route = useRoute()
watch(
  () => route.path,
  () => {
   if (route.meta.id) {
     console.log('route changed => ', route.meta.id)
    //  queryCache.invalidateQueries({ key: ['challengeInput', route.meta.id.toString()] })
     console.log('queryCache = ', queryCache)
   }
  }
)
</script> -->

<template> 

<!--max-w-sm rounded overflow-hidden shadow-lg mb-4-->
  <div class="container mx-auto">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
