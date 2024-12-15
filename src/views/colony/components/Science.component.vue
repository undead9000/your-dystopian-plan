<template>
    <h3>{{ t('titles.scienceTechTree') }}</h3>
    <p>{{ t('workInProgress') }}</p>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>