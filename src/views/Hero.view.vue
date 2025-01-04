<template>
    <div class="hero-view">
        <h3>{{ t('titles.hero') }}</h3>
        <ul v-if="factionsRelations.length" class="hero-view-list">
            <li v-for="faction in factionsRelations">
                {{ faction.name }}{{ t('hero.factionRelationToHero') }}: {{ faction.relations ? faction.relations[0].value : '0' }}
            </li>
        </ul>
        <p v-else>{{ t('noFactions') }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'
import { useColonyStore } from "../store/colonyStore"

const singleColonyStore = useColonyStore()
const { t } = useI18n()

const factionsRelations = computed(() => singleColonyStore.state.colony?.factions?.filter(faction => faction.relations && faction.relations.some(relation => relation.targetId === 'hero')) ?? [])
</script>
