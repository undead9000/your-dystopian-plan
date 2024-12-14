<template>
  <div class="colony-view">
    <h3>{{ t('titles.colony') }}</h3>
    <ul class="tabs">
      <button class="button" :class="currentLink === 0 ? 'active' : ''" @click="currentLink = 0">Science</button>
      <button class="button" :class="currentLink === 1 ? 'active' : ''" @click="currentLink = 1">Colony data</button>
      <button class="button" :class="currentLink === 2 ? 'active' : ''" @click="currentLink = 2">Factions</button>
    </ul>
    <div class="link-interface">
      <template v-if="currentLink === 0">
        <h3>{{ t('titles.scienceTechTree') }}</h3>
        <p>{{ t('workInProgress') }}</p>
      </template>

      <template v-if="currentLink === 1">
        <h3>{{ t('titles.colonyData') }}</h3>
        <p v-if="questTitles.length">{{ t('colonyRealtedQuests') }}: {{ questTitles.toString() }}</p>
        <p v-else>{{ t('titles.noRelatedQuests') }}</p>
      </template>

      <template v-if="currentLink === 2">
        <Faction />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from 'vue-i18n'
import { useColonyStore } from "../../store/colonyStore"
import Faction from "./components/Faction.component.vue"

const singleColonyStore = useColonyStore()
const { t } = useI18n()

const currentLink = ref(0)
const questTitles = computed(() => singleColonyStore.getRelatedQuests().map(quest => quest.title))
</script>