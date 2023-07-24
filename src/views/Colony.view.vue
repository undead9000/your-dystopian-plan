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
      <p>Colony Id: {{ singleColonyStore.state.colony.colonyId }}</p>
      <p>Colony current year: {{ singleColonyStore.state.colony.currentYear }}</p>
      <p>Colony realted quests: {{ singleColonyStore.getRelatedQuestsNames() }}</p>
      <p>Colony realted characters: {{ singleColonyStore.getRelatedCharactersNames() }}</p>
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
import { useColonyStore } from "../store/colonyStore"
import { ref } from "vue";
import Fraction from "./fraction/Fraction.view.vue"

const currentLink = ref(0)
const singleColonyStore = useColonyStore()

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
