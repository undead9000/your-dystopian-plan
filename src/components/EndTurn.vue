<template>
    <div class="end-turn">
        <div>{{ t('currentDate') }}: {{ gameStore.getCurrentDateFormat() }}</div>
        <button class="end-turn-button" @click="endTurnHandler()">{{ t('nextTurn') }}</button>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useGameStore, useLoopStore } from "../store/"

const gameStore = useGameStore()
const loopStore = useLoopStore()
const { t } = useI18n()

function endTurnHandler() {
    loopStore.isActionsStackEmpty()
        ? loopStore.executeActions()
        : confirm(t('emptyActionsQueueConfirm'))
            ? loopStore.executeActions()
            : false
}
</script>