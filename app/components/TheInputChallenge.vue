<script setup>
const nuxtApp = useNuxtApp()

const isUserChallenge = useCookie('isUserChallenge')
const aocSessionCookie = useCookie('session')

const route = useRoute()
const challengeDay = route.meta.id
const urlAoc = `/api/aoc/2024/day/${challengeDay}/input`
const urlFile = `/api/read?file=challenge-${challengeDay}`

const inputData = useState('input-data', () => '')

const emit = defineEmits(["newData"])

const geturl = () => {
  return isUserChallenge.value ? urlAoc : urlFile
}

// TODO... improve
const generateKey = () => {
  if (isUserChallenge.value && aocSessionCookie?.value) {
    return `${route.meta.id}${aocSessionCookie.value}`
  }

  if (isUserChallenge.value === false) {
    return `${route.meta.id}file`
  }

  return ''
}
// let key = `${route.meta.id}${isUserChallenge.value ? aocSessionCookie.value : 'file'}`

const { data: challengeInput, status, error } = await useAsyncData(generateKey(), () => useRequestFetch()(geturl()), {
  watch: [
    () => route.meta.id,
    isUserChallenge,
    aocSessionCookie
  ],
  transform(input) {
    return {
      input,
      challengeDay,
      sessionId: aocSessionCookie.value,
    }
  },
  getCachedData(key) {
    //  return
    console.log('getCachedData | key = ', key)
    // console.log('getCachedData | payload = ', isUserChallenge.value)

    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]

    // refetch
    if (!data) {
      console.log('getCachedData | no data found, refetching')
      return
    }

    // using same session id
    // if (isUserChallenge.value && aocSessionCookie.value !== data.sessionId) {
    //   console.log('refetching because session id is different')
    //   return
    // }

    // console.log('getCachedData | challengeDay = ', challengeDay)
    // console.log('getCachedData | data.challengeDay = ', data.challengeDay)
    // if (challengeDay !== data.challengeDay) {
    //   return
    // }


    // console.log('getCachedData | returning data ', data)
    return data
  }
})

watch(
  challengeInput,
  () => {
    if (status.value === 'success' || status.value === 'error') {
      inputData.value = challengeInput?.value?.input?.split(/\n/) || []
      emit('newData', inputData.value)
    }
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
  <!-- <div v-if="isUserChallenge">
    session cookie used = {{ aocSessionCookie }}
  </div>
  <br> -->

  <!-- 
  TODO: collapsible component
  -->
  <div>
    <div v-if="error">
      <div v-if="error.statusCode === 500">
        There was an error fetching data. Is the session id correct?
      </div>
      <div v-else>
        {{ error.data }}
      </div>
    </div>
    <div v-else>
      <div v-for="input in inputData">
        {{ input }}
      </div>
    </div>
  </div>
</template>

