<script setup>
const props = defineProps({
  showHome: Boolean
})
const router = useRouter()

const links = router.getRoutes().map((route) => {
  return {
    label: route.meta?.id ? `Day ${route.meta.id}` : 'Home',
    to: `${route.path}`
  }
})
const home = links.pop()
if (props.showHome) {
  links.unshift(home)
}
</script>

<template>
  <div
    v-for="(link, index) in links"
    :key="index"
  >
    <NuxtLink
      :to="link.to"
      class="flex justify-center items-center w-full h-full"
    >
      {{ link.label }}
    </NuxtLink>
  </div>
</template>
