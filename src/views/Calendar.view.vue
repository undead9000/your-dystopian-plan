<template>
    <div class="calendar-view">
        <h3>{{ currentMonthTitle }}</h3>
        <ul v-if="days" class="calendar-view-list">
            <li class="title">{{ t('calendar.monday') }}</li>
            <li class="title">{{ t('calendar.tuesday') }}</li>
            <li class="title">{{ t('calendar.wednesday') }}</li>
            <li class="title">{{ t('calendar.thursday') }}</li>
            <li class="title">{{ t('calendar.friday') }}</li>
            <li class="title">{{ t('calendar.saturday') }}</li>
            <li class="title">{{ t('calendar.sunday') }}</li>
            <li 
                v-for="day in days" 
                :class="isActive(day) ? 'inactive' : ''"
            > 
                {{ day.day }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'
import { useColonyStore } from "../store/colonyStore"
import { MonthDays } from '../models'

const singleColonyStore = useColonyStore()
const { t } = useI18n()
const options = {
    month: 'long',
    year: 'numeric'
} as Intl.DateTimeFormatOptions

const currentMonthTitle = computed(() => singleColonyStore.state.colony?.currentDate.toLocaleDateString('en', options))
const days = computed(() => singleColonyStore.getCurrentMonthDays())
const isActive = (day: MonthDays) => day.date.getMonth() !== singleColonyStore.state.colony?.currentDate.getMonth()
</script>

<style lang="scss">
.calendar-view-list {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(4, 1fr);

    li {
        padding: 6px 8px;
        border-top: 1px solid #eee;

        &.title {
            border: none;
        }

        &.inactive {
            color: #aaa;
        }
    }
}
</style>