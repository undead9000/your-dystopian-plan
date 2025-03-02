<template>
    <h3>{{ t('titles.government') }}</h3>
    <template v-if="government">
        <p>
            <span>{{ t('government.name') }}: </span> <span>{{ government.name }}</span>
        </p>
        <div>
            <span>{{ t('government.positions') }}: </span> 
            <ul class="government-positions">
                <li v-for="official in government.positions">
                    {{ official.positionName }}: {{ official.responsibleId ? responsibleCharacter(official.responsibleId) : t('notAssigned') }}
                </li>
            </ul>
        </div>
    </template>
    <p v-else>{{ t('noGovernment') }}</p>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'
import { useGameStore } from "@/store/"

const gameStore = useGameStore()
const { t } = useI18n()

const government = computed(() => gameStore.state.colony.government)
const responsibleCharacter = (id: string) => gameStore.getCharacterById(id) ? gameStore.getCharacterById(id)!.name : ''
</script>

<style lang="scss">
.government-positions {
    list-style: circle;
    padding: 0 0 0 16px;
}
</style>