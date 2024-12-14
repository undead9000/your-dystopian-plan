<template>
    <h3>Factions list</h3>
    <div class="factions-main">
        <ul class="factions-list">
            <li v-for="faction in factions">
                <a href="/" @click.prevent="showFactionDetails(faction.id)">{{ faction.factionName }}</a>
            </li>
        </ul>
        <div class="factions-details">
            <template v-if="currentFaction">
                <p>
                    <span>Faction name: </span> <span>{{ currentFaction.factionName }}</span>
                </p>
                <p>
                    <span>Faction motto: </span> <span>"{{ currentFaction.description }}"</span>
                </p>
                
            </template>
            <template v-else>
                <p>No faction selected</p>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useColonyStore } from "../../../store/colonyStore"
import { Faction } from '../../../models/models'

const singleColonyStore = useColonyStore()
const factions = computed(() => singleColonyStore.getActiveFactions())
const currentFaction = ref<Faction | null>(null)

function showFactionDetails(id: string) {
    currentFaction.value = singleColonyStore.getFactionDetails(id)
}
</script>

<style lang="scss">
.factions-main {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.factions-details {
    border: 1px solid #aaa;
    padding: 24px 36px;
    width: 100%;
    max-width: 240px;
}
</style>