<template>
    <h3>{{ t('titles.factionsList') }}</h3>
    <div class="factions-main">
        <ul v-if="factions?.length" class="factions-list">
            <li v-for="faction in factions">
                <a href="/" @click.prevent="showFactionDetails(faction.id)">{{ faction.name }}</a>
            </li>
        </ul>
        <p v-else>{{ t('noFactions') }}</p>
        <div v-if="factions?.length" class="factions-details">
            <template v-if="currentFaction">
                <p>
                    <span>{{ t('faction.name') }}: </span> <span>{{ currentFaction.name }}</span>
                </p>
                <p>
                    <span>{{ t('faction.motto') }}: </span> <span>"{{ currentFaction.description }}"</span>
                </p>
                <p>
                    <span>{{ t('faction.members') }}: </span> 
                    <ul class="factions-members">
                        <li v-for="member in currentFaction.members">
                            <template v-if="member.factionPosition">{{ singleColonyStore.getFactionPositionTitleByKey(member.factionPosition) }}: </template>
                            {{ member.name }}
                        </li>
                    </ul>
                </p>
            </template>
            <p v-else>{{ t('noFactionSelected') }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from 'vue-i18n'
import { useColonyStore } from "../../../store/colonyStore"
import { Faction } from '../../../models/models'

const singleColonyStore = useColonyStore()
const { t } = useI18n()

const factions = computed(() => singleColonyStore.getActiveFactions())
const currentFaction = ref<Faction | null>(null)

function showFactionDetails(id: string) {
    currentFaction.value = singleColonyStore.getFactionDetails(id)
}
</script>

<style lang="scss">
.factions-main {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    a {
        color: #fff;
    }
}

.factions-details {
    border: 1px solid #aaa;
    padding: 24px 36px;
    width: 100%;
    max-width: 320px;
}
.factions-members {
    list-style: circle;
    padding: 0 0 0 16px;
}
</style>