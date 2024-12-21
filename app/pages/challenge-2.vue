<script setup>
import { useChallengeQuery } from '../../composables/challenge'

definePageMeta({
  id: 2
})

const route = useRoute()

const { challengeInput } = useChallengeQuery(route.meta.id)

</script>

<template>
{{ challengeInput }}
</template>