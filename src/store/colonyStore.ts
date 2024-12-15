import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { Colony, Faction, Character } from '../models/models'
import { CharacterRawData } from '../models/interfaces'
import { GovernmentPositions, FactionPositions } from '../models/enum'
import scenarioData from "../assets/scenario.json"
import initialColony from "../assets/initialColonyData.json"

export const useColonyStore = defineStore('singleColonyStore', () => {
    const state = reactive({
        colony: null as Colony | null
    })

    function init() {
      const initialCharacters = mapCharactersData(scenarioData.charactersData)

      state.colony = {
        id: initialColony.id,
        currentYear: initialColony.currentYear,
        quests: scenarioData.questsData,
        factions: bindCharactersToFactions(scenarioData.factionsData, initialCharacters),
        characters: initialCharacters,
        government: bindInitialGovernmentStructure(initialColony.governmentStructure, initialCharacters)
      }
    }

    function bindInitialGovernmentStructure(initialStructure: string[], characters: Array<Character>) {
      const charactersInGovernment = characters.filter(character => character.governmentPosition)
      return {
        id: '0',
        governmentName: 'Temporary government',
        governmentPositions: charactersInGovernment
      } 
    }

    function bindCharactersToFactions(factions: Array<Faction>, characters: Array<Character>) {
      const factionsWithCharacters = factions.map(faction => ({
        ...faction,
        members: characters.filter(character => character.factionIds === faction.id) ?? null
      }))
      return factionsWithCharacters
    }

    function findFactionsById(id: string) {
      if(!state.colony || !state.colony.factions || typeof state.colony.factions.find(faction => faction.id === id) === 'undefined') return ''
      return state.colony.factions.find(faction => faction.id === id)!.name
    }

    function mapCharactersData(characters: Array<CharacterRawData>) {
      return characters.map(character => ({
        ...character,
        factionPosition: character.factionPosition ? FactionPositions[character.factionPosition] : null,
        governmentPosition: character.governmentPosition ? GovernmentPositions[character.governmentPosition] : null
      }))
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
        findFactionsById,
        nextTurn,
        getRelatedQuests,
        getActiveFactions,
        getFactionDetails
    }
})