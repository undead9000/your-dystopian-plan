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
                    <ul v-if="currentFactionMembers" class="factions-members">
                        <li v-for="member in currentFactionMembers">
                            <template v-if="member.factionPosition">{{ member.factionPositionName }}: </template>
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
import { Faction, Character } from '../../../models/models'

const singleColonyStore = useColonyStore()
const { t } = useI18n()

const factions = computed(() => singleColonyStore.getActiveFactions())
const currentFaction = ref<Faction | null>(null)
const currentFactionMembers = ref<Array<Character> | null>(null)

function showFactionDetails(id: string) {
    currentFaction.value = singleColonyStore.getFactionDetails(id)
    currentFactionMembers.value = singleColonyStore.getFactionCharacters(id)
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
    padding: 12px 18px;
    width: 100%;
    max-width: 320px;
}
.factions-members {
    list-style: circle;
    padding: 0 0 0 16px;
}
</style>