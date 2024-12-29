export async function useChallengeQuery() {
  const isUserChallenge = useCookie('isUserChallenge')
  const aocSessionCookie = useCookie('session')
  const route = useRoute()
  const challengeDay = route.meta.id
  
  if (isUserChallenge.value && !aocSessionCookie?.value) {
    //console.log('composable with session = ', aocSessionCookie.value)

    return {
      //challengeInput: ref(''), never use ref
      state: {
        error: 'AOC session is empty'
      }
    }
  }

  const urlAoc = `/api/aoc/2024/day/${challengeDay}/input`
  const urlFile = `/api/read?file=challenge-${challengeDay}`
  const apiUrl = isUserChallenge.value ? urlAoc : urlFile
  //console.log('using url = ', apiUrl)

  const { data, state } = await useQuery({
    key: () => ['challengeInput', challengeDay.toString()],
    query: () => useRequestFetch()(apiUrl)
      .catch(res => {
        return `There was an error while fetching data from ${isUserChallenge.value ? 'AOC server' : 'file system'}`

        //throw Error('something' + error)
        /*
        throw createError({
          data: 'some data',
          fatal: false,
          ...res,
          statusCode: 400,
          statusMessage: `Could not fetch data`,
        })
        */
      })
  })

  return {
    challengeInput: data,
    state
  }
}