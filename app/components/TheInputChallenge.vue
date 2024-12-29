<script setup>
import { useChallengeQuery } from '../../composables/challenge'

//const router = useRouter()
//const queryCache = useQueryCache()
const isUserChallenge = useCookie('isUserChallenge')
const aocSessionCookie = useCookie('session')

const emit = defineEmits(["newData"])

const { challengeInput, state } = await useChallengeQuery()

// const dataFormatted = useState('dataFormatted', () => '')

watch(challengeInput, () => {
  // console.log('challengeInput changed ')
 
  // TODO... isto nao esta a atualizar bem...ver o resultado de cada prob tb
  // dataFormatted.value = challengeInput.value.split(/\r?\n/).map(row => row.split('  '))
  //console.log('dataFormatted = ', dataFormatted.value)
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
<!--
    <div v-if="dataFormatted">
      <div v-for="el in dataFormatted">
          {{ el.toString() }}
      </div>
    </div>
-->
  </div>

  <div v-if="state.error">
    {{ state.error }}
  </div>
</template>