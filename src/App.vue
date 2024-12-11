<template>
    <div class="app-container">
        <Menu />
        <RouterView class="common-view"/>
        <EndTurn />
    </div>
</template>

<script setup lang="ts">
import Menu from './components/InGameMenu.vue'
import EndTurn from './components/EndTurn.vue';
</script>
