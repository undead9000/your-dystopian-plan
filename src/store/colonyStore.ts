import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { Colony, Faction, Character, GovernmentPosition } from '../models/models'
import { CharacterRawData } from '../models/interfaces'
import { GovernmentPositionsEnum, FactionPositionsEnum } from '../models/enum'
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
        government: assingCharactersToGovernment(initialColony.governmentStructure, initialCharacters)
      }
    }

    function assingCharactersToGovernment(initialStructure: string[], characters: Array<Character>) {
      const structure = setInitialGovernmentStructure(initialStructure)
      const assignedIntoGovernment = characters.filter(character => character.governmentPosition)

      structure.positions = structure.positions.map(position => {
        const employee = assignedIntoGovernment.find(character => character.governmentPosition === position.positionName)
        const index = assignedIntoGovernment.findIndex(character => character.governmentPosition === position.positionName)
        if(employee) assignedIntoGovernment.splice(index, 1)

        return {
          positionName: position.positionName,
          responsible: employee ? employee : null
        }
      })

      return structure
    }

    function setInitialGovernmentStructure(initialStructure: string[]) {
      return {
        name: 'Temporary government',
        positions: initialStructure.map(position => ({
          positionName: GovernmentPositionsEnum[position],
          responsible: null
        } as GovernmentPosition))
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
        factionPosition: character.factionPosition ? FactionPositionsEnum[character.factionPosition] : null,
        governmentPosition: character.governmentPosition ? GovernmentPositionsEnum[character.governmentPosition] : null
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