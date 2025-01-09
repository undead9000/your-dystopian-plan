<template>
    <div class="hero-view">
        <h3>{{ t('titles.hero') }}</h3>
        <ul v-if="factionsRelations" class="hero-view-list">
            <li v-for="[faction, relations] in factionsRelations">
                {{ faction.name }}{{ t('hero.factionRelationToHero') }}: {{ relations?.find(relation => relation.targetId === 'hero')?.value ?? 'N/A' }}
            </li>
        </ul>
        <p v-else>{{ t('noFactions') }}</p>
    </div>
</template>

<script setup lang="ts">

import { computed, watch, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { useColonyStore } from "../store/colonyStore"

const singleColonyStore = useColonyStore()
const { t } = useI18n()
const factionsRelations = ref() 

factionsRelations.value = singleColonyStore.getActiveFactionsRelations()
const actions = computed(() => singleColonyStore.state.colony?.actions)

watch(
    () => actions.value,
    () => factionsRelations.value = singleColonyStore.getActiveFactionsRelations()
)
</script>
