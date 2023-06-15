<template>
  <template v-if="!splashShown">
    <SplashScreen />
  </template>
  <template v-if="splashShown">
    <MainMenu />
  </template>
</template>

<script setup lang="ts">
import MainMenu from '../components/menus/MainMenu.vue'
import {onMounted, ref} from "vue";
import SplashScreen from "../components/SplashScreen.vue";

const splashShown = ref(false)

onMounted(()=>{
  setTimeout(()=>{
    splashShown.value = true
  }, 5000)
})

</script>
