import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { Colony } from '../models/models'
import scenarioData from "../assets/scenario.json"
import initialColony from "../assets/initialColonyData.json"

export const useColonyStore = defineStore('singleColonyStore', () => {
    const state = reactive({
        colony: null as Colony | null
    })

    function init() {
      state.colony = {
        id: initialColony.id,
        currentYear: initialColony.currentYear,
        quests: initialColony.quests,
        factions: initialColony.factions
      }
    }

    function nextTurn() {
      if(!state.colony) return
      state.colony.currentYear = state.colony.currentYear + 1
    }

    function getRelatedQuests() {
      if(!state.colony?.currentYear) return []

      const currentYear = state.colony.currentYear
      const relatedQuests = scenarioData.questData.filter(item => item.startYear <= currentYear && item.endYear > currentYear)
      return relatedQuests
    }

    function getActiveFactions() {
      const activeFactions = scenarioData.factionsData.filter(item => item.active)
      return activeFactions
    }

    function getFactionDetails(id: string) {
      const factionDetails = scenarioData.factionsData.find(faction => faction.id === id) ?? null
      return factionDetails
    }

    return {
        state,
        init,
        nextTurn,
        getRelatedQuests,
        getActiveFactions,
        getFactionDetails
    }
})