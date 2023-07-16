<template>
    Characters
    <ul v-if="charactersNames.length">
        <li v-for="name in charactersNames">{{ name }}</li>
    </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Colony, useColonyStore } from "../store/colonyStore"

const singleColonyStore = useColonyStore()
const colony = computed<Colony | null>(() => singleColonyStore.state.colony)

const charactersNames = []
colony.value?.characters.forEach(character => charactersNames.push(character.name))
</script>