export async function useChallengeQuery(day) {
  const aocSessionId = useCookie('session')
  if (!aocSessionId?.value) {
    return {
      state: {
        error: 'AOC session is empty'
      }
    }
  }

  const { data, state } = await useQuery({
    key: () => ['challengeInput', day.toString()],
    query: () => useRequestFetch()(`/api/2024/day/${day}/input`)
      .catch(res => {
        return 'There was an error while fetching data from AOC server'

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