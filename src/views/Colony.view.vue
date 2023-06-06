<template>
  <p>Colony Id: {{ colony?.colonyId }}</p>
  <p>Colony current year: {{ colony?.currentYear }}</p>
  <p>Colony realted quests: {{ questTitles }}</p>
  <button
    @click="nextYear"
  >
    Next
  </button>
</template>

<script setup lang="ts">
//import { storeToRefs } from "pinia";
//import { useCounterStore } from "../store/counter";
import { Colony, useColonyStore } from "../store/colonyStore"
import { computed, ref } from "vue";

//const { count } = storeToRefs(useCounterStore());

const currentYear = ref(0)
currentYear.value = 2258
const singleColonyStore = useColonyStore()
singleColonyStore.getColony(0, currentYear.value)
const colony = computed<Colony | null>(() => singleColonyStore.state.colony)

//АНУС ФОРМИРОВАНУС 1.45 НОЧИ БЛЕАТЬ
const questTitles = []

colony.value!.quests?.forEach(element => questTitles.push(element.title))

function nextYear() {
  currentYear.value++
  singleColonyStore.getColony(0, currentYear.value)
  console.log(questTitles)
}

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
