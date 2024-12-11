<template>
  <div class="link-view">
      <ul class="tabs">
          <button class="button" :class="currentLink === 0 ? 'active' : ''" @click="currentLink = 0">Earth</button>
          <button class="button" :class="currentLink === 1 ? 'active' : ''" @click="currentLink = 1">Official link</button>
          <button class="button" :class="currentLink === 2 ? 'active' : ''" @click="currentLink = 2">Black link</button>
      </ul>
      <div class="link-interface">
          <!-- Диалоговая система тут -->
          <template v-if="currentLink === 0">Calling Earth...</template>
          <template v-if="currentLink === 1">Calling capital...</template>
          <template v-if="currentLink === 2">Calling connect...</template>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentLink = ref(0)
</script>