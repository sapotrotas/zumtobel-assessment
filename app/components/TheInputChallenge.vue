<script setup>
import { useChallengeQuery } from '../../composables/challenge'

//const router = useRouter()
//const queryCache = useQueryCache()
const isUserChallenge = useCookie('isUserChallenge')
const aocSessionCookie = useCookie('session')

const emit = defineEmits(["newData"])

const { challengeInput, state } = await useChallengeQuery()

// queryCache.invalidateQueries({ key: ['challengeInput', router.currentRoute.value.meta?.id] })

watch(challengeInput, () => {
  emit('newData', challengeInput.value)
})

</script>

<template>

  <div v-if="isUserChallenge">
    session cookie used = {{ aocSessionCookie }}
  </div>
  <br>
  <!-- 
  TODO: collapsible component
-->

  <div v-if="!state.error">
    {{ challengeInput }}
  </div>

  <div v-if="state.error">
    {{ state.error }}
  </div>
</template>