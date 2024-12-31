export async function useChallengeQuery() {
  const isUserChallenge = useCookie('isUserChallenge')
  const aocSessionCookie = useCookie('session')
  const route = useRoute()
  const challengeDay = route.meta.id
  const urlAoc = `/api/aoc/2024/day/${challengeDay}/input`
  const urlFile = `/api/read?file=challenge-${challengeDay}`
  const apiUrl = isUserChallenge.value ? urlAoc : urlFile

  const nuxtApp = useNuxtApp()
  const requestFetch = useRequestFetch()
  const { data: challengeInput, error } = await useAsyncData(() => requestFetch(apiUrl), {
    transform(input) {
      return {
        input,
        challengeDay,
        sessionId: aocSessionCookie.value,
      }
    },
    getCachedData(key) {
      const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]

      // refetch
      if (!data || (aocSessionCookie.value !== data.sessionId || challengeDay !== data.challengeDay)) {
        return
      }

      console.log('same user, returning data ', data)
      return data
    }
  })

  return {
    challengeInput,
    error
  }
}

// aoc github: 53616c7465645f5fe1a8fc4cc124f707231915740288b4464fc94dbc337f4ae2237a6738dd38f6d761e5426dd14b1c7cbc0a79b947a169485736d181f75d5205
// aoc google: 53616c7465645f5f54e88a90381c442907d6a6cf6c17cb5957031ed1f8bddfc921810fe834cd123eea7ff8ca400ff590072d9005e14ef7d3e7c2a598d003cc90