<template>
    <h3>{{ t('titles.quests') }}</h3>
    <p v-if="questTitles.length">
        {{ t('colonyRealtedQuests') }}: {{ questTitles.toString() }}
    </p>
    <p v-else>{{ t('titles.noRelatedQuests') }}</p>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from 'vue-i18n'
import { useGameStore } from "@/store/"

const gameStore = useGameStore()
const { t } = useI18n()

const questTitles = computed(() => gameStore.getRelatedQuests().map(quest => quest.title))
</script>