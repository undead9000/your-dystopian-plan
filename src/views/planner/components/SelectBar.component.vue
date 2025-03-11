<template>
    <div class="planner-selected">
        <div v-if="selectedDay">
            <div class="planner-selected-header">
                <span>{{ selectedDay.day }} {{ currentMonth }}, {{ selectedDay.weekdayName }}</span>
            </div>

            <div class="planner-manage">
                <div v-for="iterator in MAX_ACTIONS_BY_DAY" class="planner-manage-workslot">
                    <select 
                        v-if="getFactionsOptions()" 
                        v-model="selectedOptions[iterator - 1].id" 
                        :disabled="!isActive(selectedDay)"
                    >
                        <option v-for="option in getFactionsOptions()" :value="option.value">
                            {{ option.label }}
                        </option>
                    </select>
                    <select v-model="selectedOptions[iterator - 1].value" @change="onChange(iterator - 1)" :disabled="!selectedOptions[iterator - 1].id">
                        <option v-for="option in getActionsOptions()" :value="option.value">
                            {{ option.label }}
                        </option>
                    </select>
                    <button v-if="isActionsRemovable(iterator)" @click="removeAction(iterator - 1)">x</button>
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
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { useI18n } from 'vue-i18n'
import { MonthDays, PlannerFactionSelect, Action } from '@/models'
import { useGameStore, useEngineStore } from "@/store/"

const props = defineProps({
	selectedDay: {
		type: Object as PropType<MonthDays>,
		required: false,
	},
    selectedOptions: {
        type: Object as PropType<PlannerFactionSelect[]>,
        required: true,
    }
})

const { t } = useI18n()

const engineStore = useEngineStore()
const gameStore = useGameStore()

const MAX_ACTIONS_BY_DAY = engineStore.state.consts.MAX_ACTIONS_BY_DAY
const currentMonth = computed(() => gameStore.state.colony.currentDate.toLocaleDateString('en', {month: 'long'}))
const factions = computed(() => gameStore.getActiveFactions())
const isActive = (day: MonthDays) => day.date.getMonth() === gameStore.state.colony.currentDate.getMonth()

const actionsSettled = (day: MonthDays) => engineStore.state.actions.get(day.day)
const isActionSettledSlot = (day: MonthDays, iterator: number) => actionsSettled(day).find((settledAction: Action) => settledAction.order === iterator - 1) !== undefined 
const isActionsRemovable = (iterator: number) => props.selectedDay && actionsSettled(props.selectedDay) && isActionSettledSlot(props.selectedDay, iterator)

function getFactionsOptions() {
    const defaultOption = [{value: '', label: t('planner.defaultOptionName')}]
    const factionOptions = factions.value?.map(faction => {return {value: faction.id, label: faction.name}})

    return factionOptions 
        ? defaultOption.concat(factionOptions) 
        : defaultOption
}

function getActionsOptions() {
    return [
        {value: 0, label: t('planner.defaultOptionDiffName')},
        {value: 1, label: '+'},
        {value: -1, label: '-'},
    ]

}
//TODO: update select options after removing
function removeAction(order: number) {
    if(!props.selectedDay) return

    engineStore.removeActionFromStack(props.selectedDay.day, order)
}


function onChange(order: number) {
    if(!props.selectedDay) return

    if(props.selectedOptions[order].id !== '' && props.selectedOptions[order].value) {
        engineStore.updateActionsStack(props.selectedOptions[order].id, props.selectedDay.day, order, props.selectedOptions[order].value)
    } 
     
}
</script>

<style lang="scss">
.planner-manage-workslot {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 20px;
}
</style>