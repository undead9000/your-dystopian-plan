<template>
    <div class="hero-view">
        <h3>{{ t('titles.hero') }}</h3>
        <p>{{ t('workInProgress') }}</p>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>