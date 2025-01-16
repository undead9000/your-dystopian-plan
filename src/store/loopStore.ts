import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { Character, Faction } from '../models'

export const useLoopStore = defineStore('loopStore', () => {
    const state = reactive({
        actions: new Map
    })

    function executeActions() {
        state.actions.forEach(action => action())
        state.actions.clear()
    }

    function addAction(update: Faction | Character, target: Faction | Character, diff: number, day: number) {
        state.actions.set(day, () => updateRelation(update, target, diff))
    }

    function updateRelation(update: Faction | Character, target: Faction | Character, diff: number) {
        const relation = update.relations?.find(relation => relation.targetId === target.id) ?? null

        if(relation) relation.value += diff
    }

    return {
        state,
        executeActions,
        addAction
    }
})