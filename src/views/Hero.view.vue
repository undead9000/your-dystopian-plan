<template>
    <div class="hero-view">
        <h3>{{ t('titles.hero') }}</h3>
        <ul v-if="factionsRelations" class="hero-view-list">
            <li v-for="[faction, relations] in factionsRelations">
                {{ faction.name }}{{ t('hero.factionRelationToHero') }}: {{ heroFactionRelations(relations) }}
            </li>
        </ul>
        <p v-else>{{ t('noFactions') }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import { type FactionsRelationsType, Relation } from '@/models'
import { useGameStore, useEngineStore } from "@/store/"

const gameStore = useGameStore()
const engineStore = useEngineStore()

const { t } = useI18n()
const factionsRelations = ref<FactionsRelationsType | null>(null) 
const heroFactionRelations = (relations: Relation[] | null) => { return relations?.find(relation => relation.targetId === 'hero')?.value ?? 'N/A' }

watch(
    () => engineStore.state.actions.size,
    () => factionsRelations.value = gameStore.getActiveFactionsRelations(),
    { immediate: true }
)
</script>
