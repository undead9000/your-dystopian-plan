<template>
    <div class="end-turn">
        <div>{{ t('currentDate') }}: {{ gameStore.getCurrentDateFormat() }}</div>
        <button class="end-turn-button" @click="endTurnHandler()">{{ t('nextTurn') }}</button>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useGameStore, useEngineStore } from "../store/"

const gameStore = useGameStore()
const engineStore = useEngineStore()
const { t } = useI18n()

function endTurnHandler() {
    engineStore.isActionsStackEmpty()
        ? engineStore.executeActions()
        : confirm(t('emptyActionsQueueConfirm'))
            ? engineStore.executeActions()
            : false
}
</script>