<template>
    <div class="planner-view">
        <h3>{{ title }}</h3>
        <div class="planner-view-container">  
            <SelectBar :selectedDay="selectedDay" :selectedFactions="selectedFactions"/>
            <Calendar @onSelectDay="(day: MonthDays) => onSelectDay(day)" />
        </div>    
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useGameStore, useEngineStore } from "@/store/"
import { MonthDays, PlannerFactionSelect, Action } from '@/models'

import SelectBar from './components/SelectBar.component.vue'
import Calendar from './components/Calendar.component.vue'

const gameStore = useGameStore()
const engineStore = useEngineStore()

const options = { month: 'long', year: 'numeric' } as Intl.DateTimeFormatOptions

const MAX_ACTIONS_BY_DAY = engineStore.state.consts.MAX_ACTIONS_BY_DAY
const selectedFactions = reactive<Array<PlannerFactionSelect>>([])
selectedFactions.length = MAX_ACTIONS_BY_DAY
clearSelectedFactions()

const selectedDay = ref<MonthDays | undefined>(undefined)
const isActive = (day: MonthDays) => day.date.getMonth() === gameStore.state.colony.currentDate.getMonth()
const title = computed(() => gameStore.state.colony.currentDate.toLocaleDateString('en', options))

function onSelectDay(day: MonthDays) {
    if(!isActive(day)) return 
    clearSelectedFactions()

    const selectedDayActions = engineStore.state.actions.get(day.day)

    selectedDayActions
        ? selectedDayActions.forEach((action: Action) => {
            selectedFactions[action.order] = {
                id: action.ownerId ?? '0',
                value: action.value
            } 
        })
        : clearSelectedFactions()

    selectedDay.value = day
}

function clearSelectedFactions() {
    for (let i = 0; i < MAX_ACTIONS_BY_DAY; i++) {
        selectedFactions[i] = {
            id: '',
            value: 0
        }
    }
}
</script>

<style lang="scss">
.planner-view-container {
    display: flex;
    align-items: flex-start;
    gap: 32px;
}
.planner-selected {
    min-height: 240px;
    width: 40%;
    border: 1px solid #eee;
    padding: 16px;
    box-sizing: border-box;
}
.planner-selected-header {
    margin: 0 0 8px;
}
.planner-calendar {
    display: grid;
    grid-template-columns: repeat(7, minmax(auto, max-content));
    gap: 12px;
}
.planner-calendar-day {
    font-size: 14px;
}
.planner-calendar-block {
    cursor: pointer;

    &.inactive {
        cursor: not-allowed;
        color: #aaa;
    }
}
.planner-calendar-wrapper {
    position: relative;
    width: 80px;
    height: 80px;
    border: 1px solid #eee;
    padding: 8px;
    box-sizing: border-box;
}
.planner-calendar-actions {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 12px;
    bottom: 8px;
    right: 8px;
}
.planner-calendar-action {
    width: 12px;
    height: 12px;
    border-color: #eee;
    border-width: 1px;
    border-style: dashed;

    &.filled {
        border-style: solid;
    }
}
</style>