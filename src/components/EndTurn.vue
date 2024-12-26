<template>
    <div class="end-turn">
        <div>{{ t('currentDate') }}: {{ singleColonyStore.getCurrentDateFormat() }}</div>
        <button class="end-turn-button" @click="singleColonyStore.nextTurn()">{{ t('nextTurn') }}</button>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useColonyStore } from "../store/colonyStore"

const singleColonyStore = useColonyStore()
const { t } = useI18n()
</script>