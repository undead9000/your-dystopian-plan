<template>
    <div class="calendar-view">
        <h3>{{ t('titles.calendar') }}</h3>
        <p>{{ t('workInProgress') }}</p>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>