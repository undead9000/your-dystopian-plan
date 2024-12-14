<template>
    <div class="characters-view">
        <h3>Characters</h3>
        <ul class="characters-list">
            <li v-for="character in singleColonyStore.state.colony?.characters">{{ character.name }}</li>
        </ul>
    </div>    
</template>

<script setup lang="ts">
import { useColonyStore } from "../store/colonyStore"
const singleColonyStore = useColonyStore()
</script>

<style lang="scss">
.characters-list {
    list-style: circle;
    padding: 0 0 0 16px;
}
</style>