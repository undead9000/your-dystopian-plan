<template>
    <div class="planner-view">
        <h3>{{ title }}</h3>
        <div class="planner-view-container">  
            <div class="planner-selected">
                <div v-if="selectedDay">
                    <div class="planner-selected-header">
                        <span>{{ selectedDay.day }} {{ currentMonth }}, {{ selectedDay.weekdayName }}</span>
                    </div>

                    <select v-for="action in MAX_ACTIONS_BY_DAY" v-model="selectedFactionIds[action - 1]" @change="onChange(selectedFactionIds[action - 1], action - 1)" :disabled="!isActive(selectedDay)">
                        <option disabled value="0">{{ t('planner.defaultOptionName') }}</option>
                        <option v-for="faction in factions" :value="faction.id">
                            {{ faction.name }} +
                        </option>
                    </select>

                    <!-- <div v-if="isActionSettled(selectedDay)">
                        <div><a href="/">Repeat until end</a></div>
                        <div><a href="/">Repeat from start</a></div>
                        <div><a href="/">Set all week</a></div>
                    </div> -->
                </div>
                <div v-else>{{ t('planner.dayNotSelected') }}</div>
            </div>

            <div v-if="currentMonthDays" class="planner-calendar">
                <div class="planner-calendar-day" v-for="day in daysOfWeekEnum">{{ t('calendar.' + day) }}</div>
                <div 
                    v-for="current in currentMonthDays" 
                    class="planner-calendar-block"
                    :class="!isActive(current) ? 'inactive' : ''"
                    @click="onSelectDay(current)"
                > 
                    <div v-if="current" class="planner-calendar-wrapper">
                        {{ current.day }}

                        <div v-if="isActionSettled(current)" class="planner-calendar-action" />
                    </div>
                </div>
            </div>
        </div>    
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n'
import { useGameStore, useEngineStore } from "../../store/"
import { daysOfWeekEnum } from '../../helpers'
import { MonthDays } from '../../models'

const gameStore = useGameStore()
const engineStore = useEngineStore()

const { t } = useI18n()
const options = { month: 'long', year: 'numeric' } as Intl.DateTimeFormatOptions

const MAX_ACTIONS_BY_DAY = 3 //TODO: move const limit from view to store
const selectedFactionIds = reactive<Array<string | null>>([])
selectedFactionIds.length = MAX_ACTIONS_BY_DAY
selectedFactionIds.fill("0")

const selectedDay = ref<MonthDays | null>(null)

const title = computed(() => gameStore.state.colony.currentDate.toLocaleDateString('en', options))
const currentMonthDays = computed(() => gameStore.getCurrentMonthDays())
const currentMonth = computed(() => gameStore.state.colony.currentDate.toLocaleDateString('en', {month: 'long'}))
const factions = computed(() => gameStore.getActiveFactions())


const isActive = (day: MonthDays) => day.date.getMonth() === gameStore.state.colony.currentDate.getMonth()
const isActionSettled = (day: MonthDays) => (engineStore.state.actions.get(day.day) && isActive(day))

function onSelectDay(day: MonthDays) {
    if(!isActive(day)) return 
    selectedFactionIds.fill("0")

    const selectedDayActions = engineStore.state.actions.get(day.day)
    selectedDayActions
        ? selectedDayActions.forEach(action => {
            selectedFactionIds[action.priority] = action.ownerId
        })
        : selectedFactionIds.fill("0")

    selectedDay.value = day
}

function onChange(selectedFactionId: string | null, priority: number) {
    if(!selectedDay.value) return

    engineStore.updateActionsStack(selectedFactionId, selectedDay.value.day, priority)
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
    width: 20%;
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
.planner-calendar-action {
    position: absolute;
    width: 12px;
    height: 12px;
    bottom: 8px;
    right: 8px;
    border: 1px solid #eee;
}
</style>