<template>
    <div class="planner-view">
        <h3>{{ title }}</h3>
        <div class="planner-view-container">  
            <div class="planner-selected">
                <div v-if="selectedDay">
                    <div class="planner-selected-header">
                        <span>{{ selectedDay.day }} {{ currentMonth }}, {{ selectedDay.weekdayName }}</span>
                    </div>

                    <div class="planner-manage">
                        <div v-for="action in MAX_ACTIONS_BY_DAY" class="planner-manage-workslot">
                            <select v-model="selectedFactions[action - 1].id" :disabled="!isActive(selectedDay)">
                                <option disabled value="">{{ t('planner.defaultOptionName') }}</option>
                                <option v-for="faction in factions" :value="faction.id">
                                    {{ faction.name }}
                                </option>
                            </select>
                            <select v-model.number="selectedFactions[action - 1].value" @change="onChange(action - 1)" :disabled="!selectedFactions[action - 1].id">
                                <option disabled value="">{{ t('planner.defaultOptionDiffName') }}</option>
                                <option value="1">+</option>
                                <option value="-1">-</option>
                            </select>
                        </div>
                    </div>

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


                        <ul 
                            v-if="actionsSettled(current) && isActive(current)"
                            class="planner-calendar-actions"
                        >
                            <li 
                                v-for="action in MAX_ACTIONS_BY_DAY"
                                :class="actionsSettled(current).find(settledAction => settledAction.order === action - 1) !== undefined 
                                    ? 'planner-calendar-action filled' 
                                    : 'planner-calendar-action'"
                            />
                        </ul>
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
import { MonthDays, PlannerFactionSelect } from '../../models'

const gameStore = useGameStore()
const engineStore = useEngineStore()

const { t } = useI18n()
const options = { month: 'long', year: 'numeric' } as Intl.DateTimeFormatOptions

const MAX_ACTIONS_BY_DAY = engineStore.state.consts.MAX_ACTIONS_BY_DAY
const selectedFactions = reactive<Array<PlannerFactionSelect>>([])
selectedFactions.length = MAX_ACTIONS_BY_DAY
clearSelectedFactions()

const selectedDay = ref<MonthDays | null>(null)

const title = computed(() => gameStore.state.colony.currentDate.toLocaleDateString('en', options))
const currentMonthDays = computed(() => gameStore.getCurrentMonthDays())
const currentMonth = computed(() => gameStore.state.colony.currentDate.toLocaleDateString('en', {month: 'long'}))
const factions = computed(() => gameStore.getActiveFactions())


const isActive = (day: MonthDays) => day.date.getMonth() === gameStore.state.colony.currentDate.getMonth()
const actionsSettled = (day: MonthDays) => engineStore.state.actions.get(day.day)

function onSelectDay(day: MonthDays) {
    if(!isActive(day)) return 
    clearSelectedFactions()

    const selectedDayActions = engineStore.state.actions.get(day.day)

    selectedDayActions
        ? selectedDayActions.forEach(action => {
            selectedFactions[action.order] = {
                id: action.ownerId,
                value: action.value
            } 
        })
        : clearSelectedFactions()

    selectedDay.value = day
}

function onChange(order: number) {
    if(!selectedDay.value) return

    if(selectedFactions[order].id !== '' && selectedFactions[order].value) engineStore.updateActionsStack(selectedFactions[order].id, selectedDay.value.day, order, selectedFactions[order].value)
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