import { defineStore } from 'pinia'
import { useGameStore } from './gameStore'
import { reactive } from 'vue'
import { Character, Faction, type FactionIdType } from '../models'

export const useLoopStore = defineStore('loopStore', () => {
    const gameStore = useGameStore()

    const state = reactive({
        actions: new Map
    })

    function initializeGameStore() {
        gameStore.init()
    }

    function executeActions() {
        state.actions.forEach(action => action())
        state.actions.clear()

        const date = new Date(gameStore.state.colony.currentDate)
        gameStore.state.colony.currentDate = new Date(date.setMonth(date.getMonth() + 1))
    }

    function updateActionsStack(factionId: FactionIdType | null, currentDate: number) {
        const targetFaction = gameStore.state.factions.find(faction => faction.id === factionId)

        if(targetFaction) state.actions.set(currentDate, () => updateRelation(targetFaction, gameStore.state.hero, 0.01))
    }

    function isActionsStackEmpty() {
        return !!state.actions.size
    }

    //TODO: rewrite more abstract
    function updateRelation(update: Faction | Character, target: Faction | Character, diff: number) {
        const relation = update.relations?.find(relation => relation.targetId === target.id) ?? null

        if(relation) relation.value += diff
    }

    return {
        state,
        initializeGameStore,
        executeActions,
        updateActionsStack,
        isActionsStackEmpty
    }
})