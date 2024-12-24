<template>
    <h3>{{ t('titles.government') }}</h3>
    <template v-if="government">
        <p>
            <span>{{ t('government.name') }}: </span> <span>{{ government.name }}</span>
        </p>
        <p>
            <span>{{ t('government.positions') }}: </span> 
            <ul class="government-positions">
                <li v-for="official in government.positions">
                    {{ official.positionName }}: {{ official.responsibleId ? responsibleCharacter(official.responsibleId) : t('notAssigned') }}
                </li>
            </ul>
        </p>
    </template>
    <p v-else>{{ t('noGovernment') }}</p>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'
import { useColonyStore } from "../../../store/colonyStore"

const singleColonyStore = useColonyStore()
const { t } = useI18n()

const government = computed(() => singleColonyStore.state.colony?.government)
const responsibleCharacter = (id: string) => singleColonyStore.getCharacterById(id) ? singleColonyStore.getCharacterById(id)!.name : ''
</script>

<style lang="scss">
.government-positions {
    list-style: circle;
    padding: 0 0 0 16px;
}
</style>