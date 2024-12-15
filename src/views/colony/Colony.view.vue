<template>
  <div class="colony-view">
    <h3>{{ t('titles.colony') }}</h3>
    <ul class="tabs">
      <button class="button" :class="currentLink === 0 ? 'active' : ''" @click="currentLink = 0">{{ t('titles.scienceTechTree') }}</button>
      <button class="button" :class="currentLink === 1 ? 'active' : ''" @click="currentLink = 1">{{ t('titles.quests') }}</button>
      <button class="button" :class="currentLink === 2 ? 'active' : ''" @click="currentLink = 2">{{ t('titles.factionsList') }}</button>
      <button class="button" :class="currentLink === 3 ? 'active' : ''" @click="currentLink = 3">{{ t('titles.government') }}</button>
    </ul>
    <div class="link-interface">
        <ScienceComponent v-if="currentLink === 0" />
        <QuestsComponent v-if="currentLink === 1" />
        <FactionComponent v-if="currentLink === 2" />
        <GovernmentComponent v-if="currentLink === 3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from 'vue-i18n'
import ScienceComponent from "./components/Science.component.vue";
import QuestsComponent from './components/Quests.component.vue'
import FactionComponent from "./components/Faction.component.vue"
import GovernmentComponent from "./components/Government.component.vue";

const { t } = useI18n()
const currentLink = ref(0)
</script>