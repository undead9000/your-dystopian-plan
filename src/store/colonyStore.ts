import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { Colony, Faction, Character, GovernmentPosition } from '../models/models'
import { CharacterRawData } from '../models/interfaces'
import scenarioData from "../assets/scenario.json"
import initialColony from "../assets/initialColonyData.json"

export const useColonyStore = defineStore('singleColonyStore', () => {
    const factionPositionsDictionary = getSturctureMap(initialColony.factionPositions)
    const governmentPositionsDictionary = getSturctureMap(initialColony.governmentPositions)

    const state = reactive({
        colony: null as Colony | null,
    })

    function init() {
      const initialCharacters = mapCharactersData(scenarioData.charactersData)

      state.colony = {
        id: initialColony.id,
        currentYear: initialColony.currentYear,
        quests: scenarioData.questsData,
        factions: bindCharactersToFactions(scenarioData.factionsData, initialCharacters),
        characters: initialCharacters,
        government: assingCharactersToGovernment(initialColony.governmentStructure, initialColony.governmentName, initialCharacters)
      }
    }

    function assingCharactersToGovernment(initialStructure: string[], name: string, characters: Array<Character>) {
      const structure = setInitialGovernmentStructure(initialStructure, name)
      const assignedIntoGovernment = characters.filter(character => character.governmentPosition)

      structure.positions = structure.positions.map(position => {
        const employee = assignedIntoGovernment.find(character => character.governmentPosition === position.position)
        const index = assignedIntoGovernment.findIndex(character => character.governmentPosition === position.position)
        if(employee) assignedIntoGovernment.splice(index, 1)

        return {
          position: position.position,
          responsible: employee ? employee : null
        }
      })

      return structure
    }

    function setInitialGovernmentStructure(initialStructure: string[], name: string) {
      return {
        name: name,
        positions: initialStructure.map(position => ({
          position: position,
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
        factionPosition: character.factionPosition ? character.factionPosition : null,
        governmentPosition: character.governmentPosition ? character.governmentPosition : null
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

    function getSturctureMap(dictionary: Record<string, any>[]) {
      return new Map(dictionary.map(position => [Object.keys(position)[0], Object.values(position)[0]]))
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

    function getFactionPositionTitleByKey(key: string) {
      return factionPositionsDictionary.get(key)
    }

    function getGovernmentPositionTitleByKey(key: string) {
      return governmentPositionsDictionary.get(key)
    }

    return {
        state,
        init,
        findFactionsById,
        nextTurn,
        getRelatedQuests,
        getActiveFactions,
        getFactionDetails,
        getFactionPositionTitleByKey,
        getGovernmentPositionTitleByKey
    }
})