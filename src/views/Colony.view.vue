<template>
  <ul class="tabs">
    <a class="button" @click="currentLink = 0">Science</a>
    <a class="button" @click="currentLink = 1">Colony data</a>
    <a class="button" @click="currentLink = 2">Fractions</a>
  </ul>
  <div class="link-interface">
    <!-- Диалоговая система тут -->
    <template v-if="currentLink === 0">Science tech three</template>
    <template v-if="currentLink === 1">
      <p>Colony details</p>
      <p>Colony Id: {{ colony?.colonyId }}</p>
      <p>Colony current year: {{ colony?.currentYear }}</p>
      <p>Colony realted quests: {{ questTitles }}</p>
      <p>Colony realted characters: {{ charactersNames }}</p>
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
//import { storeToRefs } from "pinia";
import { Colony, useColonyStore } from "../store/colonyStore"
import { computed, ref } from "vue";
import Fraction from "./fraction/Fraction.view.vue"

const currentLink = ref(0)

const currentYear = ref(0)
currentYear.value = 2261
const singleColonyStore = useColonyStore()
singleColonyStore.getColony(0, currentYear.value)
const colony = computed<Colony | null>(() => singleColonyStore.state.colony)

//АНУС ФОРМИРОВАНУС 1.45 НОЧИ БЛЕАТЬ
const questTitles = []
const charactersNames = []

colony.value!.characters.forEach(character => charactersNames.push(character.name))
colony.value!.quests?.forEach(element => questTitles.push(element.title))
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}

.routerlink {
  margin: 0 10px;
}
</style>
