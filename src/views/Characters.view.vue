<template>
    <div class="characters-view">
        <h3>{{ t('titles.characters') }}</h3>
        <ul class="characters-list">
            <li v-for="character in singleColonyStore.state.colony?.characters">
                <span v-if="character.governmentPosition" class="characters-positions">
                    {{ governmentPositionTitle(character.governmentPosition) }},
                </span>
                <span v-if="character.factionPosition && character.factionIds" class="characters-positions">
                    {{ factionPositionTitle(character.factionPosition) }} in {{ singleColonyStore.findFactionsById(character.factionIds) }},
                </span>
                {{ character.name }}
            </li>
        </ul>
    </div>    
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useColonyStore } from "../store/colonyStore"

const singleColonyStore = useColonyStore()
const { t } = useI18n()

const factionPositionTitle = (position: string) => singleColonyStore.factionPositionsDictionary.get(position)
const governmentPositionTitle = (position: string) => singleColonyStore.governmentPositionsDictionary.get(position)
</script>

<style lang="scss">
.characters-list {
    list-style: circle;
    padding: 0 0 0 16px;
}
</style>