import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { Colony, Faction, Character } from '../models/models'
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
        quests: scenarioData.questsData,
        factions: bindCharactersToFactions(scenarioData.factionsData, scenarioData.charactersData),
        characters: scenarioData.charactersData
      }
    }

    function bindCharactersToFactions(factions: Array<Faction>, characters: Array<Character>) {
      const factionsWithCharacters = factions.map(faction => ({
        ...faction,
        members: characters.filter(character => character.factionIds === faction.id) ?? null
      }))
      return factionsWithCharacters
    }

    function nextTurn() {
      if(!state.colony) return
      state.colony.currentYear = state.colony.currentYear + 1
    }

    function getRelatedQuests() {
      if(!state.colony?.quests) return []

      const currentYear = state.colony.currentYear
      const relatedQuests = state.colony.quests.filter(item => item.startYear <= currentYear && item.endYear > currentYear)
      return relatedQuests
    }

    function getActiveFactions() {
      if(!state.colony?.factions) return null

      const activeFactions = state.colony.factions.filter(item => item.active)
      return activeFactions
    }

    function getFactionDetails(factionId: string) {
      if(!state.colony?.factions) return null

      const factionDetails = state.colony.factions.find(faction => faction.id === factionId) ?? null
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