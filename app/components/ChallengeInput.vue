<script setup>
const nuxtApp = useNuxtApp()
const config = useRuntimeConfig()

const inputMethod = useCookie('inputMethod')
const aocSessionCookie = useCookie('session')

const route = useRoute()
const challengeDay = route.meta.id

const urlAoc = `/api/aoc/2024/day/${challengeDay}/input`
const urlFile = `${config.public.appUrl}${config.public.filesPath}/challenge-${challengeDay}.txt`

const inputData = useState('input-data', () => '')

const emit = defineEmits(['newData'])

const getUrl = () => {
  return inputMethod.value === inputMethodType.FILE ? urlFile : urlAoc
}

// TODO... improve
const generateCacheKey = () => {
  if (inputMethod.value === inputMethodType.SESSION && aocSessionCookie?.value) {
    return `${challengeDay}_${aocSessionCookie.value}`
  }

  if (inputMethod.value === inputMethodType.FILE) {
    return `${challengeDay}_file`
  }

  return ''
}

const { data: challengeInput, error } = await useAsyncData(
  generateCacheKey(),
  () => {
    if (inputMethod.value === inputMethodType.SESSION && !aocSessionCookie.value) {
      return
    }
    return useRequestFetch()(getUrl())
  }, 
  {
  watch: [
    () => route.meta.id,
    inputMethod,
    aocSessionCookie
  ],
  transform(input) {
    return {
      input,
      challengeDay,
      sessionId: aocSessionCookie.value
    }
  },
  getCachedData(key) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]

    // refetch
    if (!data) {
      // console.log('getCachedData | no data found, refetching')
      return
    }

    // console.log('getCachedData | returning data ', data)
    return data
  }
})

watch(
  challengeInput,
  () => {
      inputData.value = challengeInput?.value?.input?.split(/\n/) || []
      emit('newData', inputData.value)
  },
  {
    immediate: true
  }
)

// TODO... remove
// aoc github: 53616c7465645f5fe1a8fc4cc124f707231915740288b4464fc94dbc337f4ae2237a6738dd38f6d761e5426dd14b1c7cbc0a79b947a169485736d181f75d5205
// aoc google: 53616c7465645f5f54e88a90381c442907d6a6cf6c17cb5957031ed1f8bddfc921810fe834cd123eea7ff8ca400ff590072d9005e14ef7d3e7c2a598d003cc90

</script>

<template>
  <div v-if="error">
    <div v-if="error.statusCode === 500">
      <p>There was an error fetching data.</p>
      <p>Is the session id correct?</p>
    </div>
    <div v-else>
      {{ error.data }}
    </div>
  </div>
  <div v-else>
    <div
      v-for="(input, index) in inputData"
      :key="index"
    >
      {{ input }}
    </div>
  </div>
</template>
