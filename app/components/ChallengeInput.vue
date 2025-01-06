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
        return
      }

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
