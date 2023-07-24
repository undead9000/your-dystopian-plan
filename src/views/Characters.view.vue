<template>
    Characters
    <br /><br />
    <ul v-if="charactersStore.getAllCharacters().length">
        <li v-for="character in charactersStore.getAllCharacters()">{{ character.name }}</li>
    </ul>
</template>

<script setup lang="ts">
import { useCharactersStore } from '../store/charactersStore'
const charactersStore = useCharactersStore()
</script>