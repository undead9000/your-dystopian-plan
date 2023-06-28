<template>
    <ul class="tabs">
        <a class="button" @click="currentLink = 0">Earth</a>
        <a class="button" @click="currentLink = 1">Official link</a>
        <a class="button" @click="currentLink = 2">Black link</a>
    </ul>
    <div class="link-interface">
        <!-- Диалоговая система тут -->
        <template v-if="currentLink === 0">Calling Earth...</template>
        <template v-if="currentLink === 1">Calling capital...</template>
        <template v-if="currentLink === 2">Calling connect...</template>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentLink = ref(0)
</script>

<style lang="scss">
.tabs {
  display: flex;
  align-items: center;

  .button {
    margin-right: 0.3rem;
    margin-bottom: 0;

    &:last-child {
        margin: 0;
    }
  }
}
</style>