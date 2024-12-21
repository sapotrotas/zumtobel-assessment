export async function useChallengeQuery(day) {
  const { data } = await useQuery({
    key: () => ['challengeInput', day],
    query: () => useRequestFetch()(`/api/2024/day/${day}/input`)
  })
  return { challengeInput: data }
}