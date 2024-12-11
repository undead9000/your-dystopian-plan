<template>
    <div class="end-turn">
        <div>Colony current year: {{ singleColonyStore.state.colony?.currentYear }}</div>
        <button class="end-turn-button" @click="singleColonyStore.nextTurn()">Next turn</button>
    </div>
</template>

<script setup lang="ts">
import { useColonyStore } from "../store/colonyStore"

const singleColonyStore = useColonyStore()
</script>