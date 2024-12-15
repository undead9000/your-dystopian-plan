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
import { useColonyStore } from "../../../store/colonyStore"

const singleColonyStore = useColonyStore()
const { t } = useI18n()

const questTitles = computed(() => singleColonyStore.getRelatedQuests().map(quest => quest.title))
</script>