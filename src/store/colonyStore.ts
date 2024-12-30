import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { Colony, Faction, Character, GovernmentPosition, MonthDays } from '../models/models'
import { CharacterRawData } from '../models/interfaces'
import scenarioData from "../assets/scenario.json"

export const useColonyStore = defineStore('singleColonyStore', () => {
    const initColonyData = scenarioData.colonyData
    const initFactionsData = scenarioData.factionsData
    const initCharactersData = scenarioData.charactersData
    const factionPositionsDictionary = getSturctureMap(initColonyData.factionPositions)
    const governmentPositionsDictionary = getSturctureMap(initColonyData.governmentPositions)

    const state = reactive({
        colony: null as Colony | null,
    })

    function init() {
      const initialCharacters = mapCharactersData(initFactionsData, initCharactersData)

      state.colony = {
        id: initColonyData.id,
        currentDate: setInitDate(),
        quests: scenarioData.questsData,
        factions: bindCharactersToFactions(initFactionsData, initialCharacters),
        characters: initialCharacters,
        government: assingCharactersToGovernment(initColonyData.governmentStructure, initColonyData.governmentName, initialCharacters)
      }
    }

    function setInitDate() {
      return new Date(Date.UTC(initColonyData.currentYear, 0, 1, 0, 0))
    }

    function getCurrentDateFormat() {
      if(!state.colony) return ''
      
      const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      } as Intl.DateTimeFormatOptions

      return state.colony?.currentDate.toLocaleDateString('en', options)
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
          positionName: getGovernmentPositionTitleByKey(position.position),
          responsibleId: employee ? employee.id : null
        }
      })

      return structure
    }

    function setInitialGovernmentStructure(initialStructure: string[], name: string) {
      return {
        name: name,
        positions: initialStructure.map(position => ({
          position: position,
          positionName: position,
          responsibleId: null
        } as GovernmentPosition))
      } 
    }

    function bindCharactersToFactions(factions: Array<Faction>, characters: Array<Character>) {
      const factionsWithCharacters = factions.map(faction => ({
        ...faction,
        members: characters.filter(character => character.factionId === faction.id).map(character => character.id) ?? null
      }))
      return factionsWithCharacters
    }

    function findFactionsById(factions: Array<Faction>, id: string | null) {
      if(!id) return undefined

      return factions.find(faction => faction.id === id)
    }

    function mapCharactersData(factions: Array<Faction>, characters: Array<CharacterRawData>) {
      return characters.map(character => ({
        ...character,
        faction: findFactionsById(factions, character.factionId) ?? null,
        factionPosition: character.factionPosition ? character.factionPosition : null,
        factionPositionName: character.factionPosition ? getFactionPositionTitleByKey(character.factionPosition) : null,
        governmentPosition: character.governmentPosition ? character.governmentPosition : null,
        governmentPositionName: character.governmentPosition ? getGovernmentPositionTitleByKey(character.governmentPosition) : null
      }))
    }

    function nextTurn() {
      if(!state.colony) return

      const date = new Date(state.colony.currentDate)
      state.colony.currentDate = new Date(date.setMonth(date.getMonth() + 1))
    }

    function getRelatedQuests() {
      if(!state.colony?.quests) return []

      const currentYear = state.colony.currentDate.getFullYear()
      return state.colony.quests.filter(item => item.startYear <= currentYear && item.endYear > currentYear) ?? []
    }

    function getSturctureMap(dictionary: Record<string, any>[]) {
      return new Map(dictionary.map(position => [Object.keys(position)[0], Object.values(position)[0]]))
    }

    function getActiveFactions() {
      if(!state.colony?.factions) return null

      return state.colony.factions.filter(item => item.active)
    }

    function getFactionDetails(factionId: string) {
      if(!state.colony?.factions) return null

      return state.colony.factions.find(faction => faction.id === factionId) ?? null
    }

    function getFactionCharacters(factionId: string) {
      if(!state.colony?.characters) return null

      return state.colony.characters.filter(character => character.alive && character.factionId === factionId) ?? null
    }

    function getCharacterById(characterId: string) {
      if(!state.colony?.characters) return null

      return state.colony.characters.find(character => character.id === characterId) ?? null
    }

    function getFactionPositionTitleByKey(key: string) {
      return factionPositionsDictionary.get(key)
    }

    function getGovernmentPositionTitleByKey(key: string) {
      return governmentPositionsDictionary.get(key)
    }

    function getCurrentMonthDays() {
      if(!state.colony?.currentDate) return 0

      let result = [] as Array<MonthDays>
      const options = { weekday: "long" } as Intl.DateTimeFormatOptions;
      const monthLength = new Date(state.colony.currentDate.getFullYear(), (state.colony.currentDate.getMonth() ?? 0) + 1, 0).getDate()

      for(let i = 1; i <= monthLength; i++) {
        const date = new Date(state.colony.currentDate.getFullYear(), (state.colony.currentDate.getMonth() ?? 0), i)

        result.push({
          day: i,
          date: date,
          shift: date.getDay(),
          weekdayName: new Intl.DateTimeFormat("en", options).format(date)
        })
      }

      let startShiftLength = result[0].shift ? result[0].shift : 7
      let startShift = [] as Array<MonthDays>

      for(let i = startShiftLength - 1; i >= 1; i--) {
        const date = new Date(state.colony.currentDate.getFullYear(), (state.colony.currentDate.getMonth() ?? 0), 0)
        const prevDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - i + 1)

        startShift.push({
          day: prevDate.getDate(),
          date: prevDate,
          shift: startShiftLength - i,
          weekdayName: new Intl.DateTimeFormat("en", options).format(prevDate)
        })
      }

      result = startShift.concat(result)
      let endShiftLength = result.at(-1)?.shift

      if(endShiftLength) {
        let endShift = [] as Array<MonthDays>
        
        for(let i = 1; i <= (7 - endShiftLength); i++) {
          const nextDate = new Date(state.colony.currentDate.getFullYear(), (state.colony.currentDate.getMonth() ?? 0) + 1, 0)
          nextDate.setDate(nextDate.getDate() + i)

          endShift.push({
            day: nextDate.getDate(),
            date: nextDate,
            shift: (i + 1) % 7,
            weekdayName: new Intl.DateTimeFormat("en", options).format(nextDate)
          })
        }

        result = result.concat(endShift)
      }
      
      return result
    }

    return {
        state,
        init,
        getCurrentDateFormat,
        nextTurn,
        getRelatedQuests,
        getActiveFactions,
        getFactionDetails,
        getFactionCharacters,
        getCharacterById,
        getCurrentMonthDays,
    }
})