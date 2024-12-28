<script setup>
const router = useRouter()
const links = router.getRoutes().map(route => {
  return {
    label: route.path.slice(route.path.lastIndexOf('-') + 1),
    to: `${route.path}`
  }
})

/*
watch(aocSessionId, () =>  {
 // console.log('watching aocSessionId = ', newValue)
 //   console.log('watching aocSessionId | INVALIDATING QUERY ', newValue)
    queryCache.invalidateQueries({ key: ['challengeInput', router.currentRoute.value.meta?.id] })
})
*/

</script>

<template>
  <header class="flex items-center mx-auto px-4"> 
    <ul>
      Challenge:
      <li v-for="link in links">
        <NuxtLink :to="link.to" >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>

  
  </header>
</template>