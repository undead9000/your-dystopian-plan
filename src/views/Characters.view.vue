<template>
    <div class="characters-view">
        <h3>{{ t('titles.characters') }}</h3>
        <ul class="characters-list">
            <li v-for="character in characters"  class="characters-list-positions">
                <span>
                    {{ character.name }}<span v-if="character.governmentPositionKey || character.factionPositionKey">,</span>
                </span>
                <span v-if="character.governmentPositionKey">
                    {{ character.governmentPositionName }} 
                </span>
                <span v-if="character.governmentPositionKey && character.factionPositionKey"> and </span>
                <span v-else-if="character.factionPositionKey">, </span>
                <span v-if="character.factionPositionKey && character.factionId" class="faction">
                    {{ character.factionPositionName }} in <span>"{{ character.faction?.name }}"</span>
                </span>
            </li>
        </ul>
    </div>    
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'
import { useGameStore } from "@/store/"

const gameStore = useGameStore()
const { t } = useI18n()

const characters = computed(() => gameStore.state.colony ? gameStore.state.characters : [])
</script>

<style lang="scss">
.characters-list {
    padding: 0 0 0 16px;
    list-style: circle;
}
.characters-list-positions {
    & > span {
        margin: 0 6px 0 0;
        display: inline-block;
        text-transform: lowercase;

        &:first-child {
            text-transform: capitalize;
        }

        &:last-child {
            margin: 0;
        }
    }
}
</style>