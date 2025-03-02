<template>
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
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { useI18n } from 'vue-i18n'
import { MonthDays, PlannerFactionSelect } from '@/models'
import { useGameStore, useEngineStore } from "@/store/"

const props = defineProps({
	selectedDay: {
		type: Object as PropType<MonthDays>,
		required: false,
	},
    selectedFactions: {
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

function onChange(order: number) {
    if(!props.selectedDay) return

    if(props.selectedFactions[order].id !== '' && props.selectedFactions[order].value) engineStore.updateActionsStack(props.selectedFactions[order].id, props.selectedDay.day, order, props.selectedFactions[order].value)
}
</script>