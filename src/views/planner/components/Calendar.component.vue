<template>
    <div v-if="currentMonthDays" class="planner-calendar">
        <div class="planner-calendar-day" v-for="day in daysOfWeekEnum">{{ t('calendar.' + day) }}</div>
        <div 
            v-for="current in currentMonthDays" 
            class="planner-calendar-block"
            :class="!isActive(current) ? 'inactive' : ''"
            @click="emit('onSelectDay', current)"
        > 
            <div v-if="current" class="planner-calendar-wrapper">
                {{ current.day }}
                <ul v-if="actionsSettled(current) && isActive(current)" class="planner-calendar-actions">
                    <li v-for="iterator in MAX_ACTIONS_BY_DAY" :class="isActionSettledSlot(current, iterator) ? 'filled' : ''" />
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'
import { daysOfWeekEnum } from '@/helpers'
import { useGameStore, useEngineStore } from "@/store/"
import { MonthDays, Action } from '@/models'

const emit = defineEmits(['onSelectDay'])

const gameStore = useGameStore()
const engineStore = useEngineStore()

const { t } = useI18n()
const MAX_ACTIONS_BY_DAY = engineStore.state.consts.MAX_ACTIONS_BY_DAY
const currentMonthDays = computed(() => gameStore.getCurrentMonthDays())

const isActive = (day: MonthDays) => day.date.getMonth() === gameStore.state.colony.currentDate.getMonth()
const actionsSettled = (day: MonthDays) => engineStore.state.actions.get(day.day)
const isActionSettledSlot = (day: MonthDays, iterator: number) => actionsSettled(day).find((settledAction: Action) => settledAction.order === iterator - 1) !== undefined 
</script>