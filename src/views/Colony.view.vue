<template>
  <ul class="tabs">
    <button class="button" :class="currentLink === 0 ? 'active' : ''" @click="currentLink = 0">Science</button>
    <button class="button" :class="currentLink === 1 ? 'active' : ''" @click="currentLink = 1">Colony data</button>
    <button class="button" :class="currentLink === 2 ? 'active' : ''" @click="currentLink = 2">Fractions</button>
  </ul>
  <div class="link-interface">
    <template v-if="currentLink === 0">Science tech three</template>

    <template v-if="currentLink === 1">
      <p>Colony details</p>
      <p>Colony Id: {{ singleColonyStore.state.colony?.colonyId }}</p>
      <p>Colony current year: {{ singleColonyStore.state.colony?.currentYear }}</p>
      <p v-if="questTitles.length">Colony realted quests: {{ questTitles.toString() }}</p>
      <p v-else>No related quests</p>
      <button @click="singleColonyStore.nextTurn()">Next</button>
    </template>

    <template v-if="currentLink === 2">
      <p>Fractions list</p>
      <ul>
        <li><Fraction :fraction="{id:1, name: 'Fraction 1'}"/></li>
        <li><Fraction :fraction="{id:2, name: 'Fraction 2'}"/></li>
        <li><Fraction :fraction="{id:3, name: 'Fraction 3'}"/></li>
        <li><Fraction :fraction="{id:4, name: 'Fraction 4'}"/></li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useColonyStore } from "../store/colonyStore"
import { computed, ref } from "vue";
import Fraction from "./fraction/Fraction.view.vue"

const currentLink = ref(0)
const singleColonyStore = useColonyStore()
const questTitles = computed(() => singleColonyStore.getRelatedQuests().map(quest => quest.title))
</script>
