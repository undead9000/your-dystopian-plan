<template>
    <div class="link-view">
        <h3>{{ t('titles.link') }}</h3>
        <ul class="tabs">
            <button class="button" :class="currentLink === 0 ? 'active' : ''" @click="currentLink = 0">{{ t('titles.earthLink') }}</button>
            <button class="button" :class="currentLink === 1 ? 'active' : ''" @click="currentLink = 1">{{ t('titles.officialColonyChannelLink') }}</button>
            <button class="button" :class="currentLink === 2 ? 'active' : ''" @click="currentLink = 2">{{ t('titles.hiddenColonyChannelLink') }}</button>
        </ul>
        <div class="link-interface">
            <!-- Dialogue system here -->
            <template v-if="currentLink === 0">{{ t('noSignal') }}</template>
            <template v-if="currentLink === 1">{{ t('noSignal') }}</template>
            <template v-if="currentLink === 2">{{ t('noSignal') }}</template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentLink = ref(0)
</script>