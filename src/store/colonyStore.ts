import { defineStore } from 'pinia'
import { reactive, toRaw } from 'vue'
import { Colony, Faction, Character, GovernmentPosition, MonthDays, Action, CharacterRawData, FactionRawData, RelationRawData } from '../models'
import { type RelationType, type FactionIdType } from '../models'
import scenarioData from "../assets/scenario.json"

export const useColonyStore = defineStore('singleColonyStore', () => {
    const initColonyData = scenarioData.colonyData
    const initCharactersData = scenarioData.charactersData
    const factionPositionsDictionary = setupSturctureMap(initColonyData.factionPositions)
    const governmentPositionsDictionary = setupSturctureMap(initColonyData.governmentPositions)

    const state = reactive({
        colony: null as Colony | null,
    })

    //TODO: Add param for init()
    function init() {
      const initFactionsData = initFactions(scenarioData.factionsData, scenarioData.charactersData)
      const initialCharacters = mapCharactersData(initFactionsData, initCharactersData)

      state.colony = {
        id: initColonyData.id,
        currentDate: initDate(),
        quests: scenarioData.questsData,
        factions: initFactionsData,
        characters: initialCharacters,
        government: assingCharactersToGovernment(initColonyData.governmentStructure, initColonyData.governmentName, initialCharacters),
        hero: initHero(),
        actions: []
      }
    }

    function initHero() {
      return {
        id: "hero",
        name: "Earth's consul",
        alive: true,
        factionId :null,
        factionPositionKey :null,
        governmentPositionKey :null,
        faction :null,
        factionPositionName :null,
        governmentPositionName :null
      }
    }

    function initFactions(factions: Array<FactionRawData>, characters: Array<CharacterRawData>) {
      const result = factions.map(faction => new Faction(
        faction.id,
        faction.name,
        faction.description,
        faction.active,
        faction.political,
        initFactionMembers(faction.id, characters),
        initFactionRelations(faction.relations)
      ))

      return result
    }

    function initFactionMembers(factionId: string, characters: Array<CharacterRawData>) {
      const filteredCharacters = characters.filter(character => character.factionId === factionId) ?? []
      return filteredCharacters.length 
        ? filteredCharacters.map(character => character.id)
        : null
    }

    function initFactionRelations(relations: Array<RelationRawData> | null) {
      return relations 
        ? relations.map(relation => ({
          ...relation,
          type: relation.type as RelationType,
          targetId: relation.targetId
        }))
        : null
    }

    function initDate() {
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
      const assignedIntoGovernment = characters.filter(character => character.governmentPositionKey)

      structure.positions = structure.positions.map(position => {
        const employee = assignedIntoGovernment.find(character => character.governmentPositionKey === position.positionKey)
        const index = assignedIntoGovernment.findIndex(character => character.governmentPositionKey === position.positionKey)
        if(employee) assignedIntoGovernment.splice(index, 1)

        return {
          positionKey: position.positionKey,
          positionName: getGovernmentPositionTitleByKey(position.positionKey),
          responsibleId: employee ? employee.id : null
        }
      })

      return structure
    }

    function setInitialGovernmentStructure(initialStructure: string[], name: string) {
      return {
        name: name,
        positions: initialStructure.map(position => ({
          positionKey: position,
          positionName: position,
          responsibleId: null
        } as GovernmentPosition))
      } 
    }

    function findFactionsById(factions: Array<Faction>, id: string | null) {
      if(!id) return undefined

      return factions.find(faction => faction.id === id)
    }

    function mapCharactersData(factions: Array<Faction>, characters: Array<CharacterRawData>) {
      return characters.map(character => ({
        ...character,
        faction: findFactionsById(factions, character.factionId) ?? null,
        factionPositionKey: character.factionPosition ? character.factionPosition : null,
        factionPositionName: character.factionPosition ? getFactionPositionTitleByKey(character.factionPosition) : null,
        governmentPositionKey: character.governmentPosition ? character.governmentPosition : null,
        governmentPositionName: character.governmentPosition ? getGovernmentPositionTitleByKey(character.governmentPosition) : null
      }))
    }

    function nextTurn() {
      if(!state.colony) return

      if(state.colony.actions.length) {
        state.colony.actions.forEach(action => action?.callback())
        state.colony.actions = []
      }

      const date = new Date(state.colony.currentDate)
      state.colony.currentDate = new Date(date.setMonth(date.getMonth() + 1))
    }

    function addAction(actionId: string, factionId: FactionIdType | null) {
      if(!factionId || !state.colony?.factions || !state.colony.actions) return

      const targetFaction = toRaw(state.colony.factions.find(faction => faction.id === factionId))
      if(targetFaction) {
        const action = new Action(actionId, "FractionCharacter", 1, 0, () => targetFaction.updateRelations('hero'))
        state.colony.actions.push(action)
      }
    }

    function isActionsEmpty() {
      if(!state.colony?.actions) return

      return !!state.colony?.actions.length
    }

    function getRelatedQuests() {
      if(!state.colony?.quests) return []

      const currentYear = state.colony.currentDate.getFullYear()
      return state.colony.quests.filter(item => item.startYear <= currentYear && item.endYear > currentYear) ?? []
    }

    function setupSturctureMap(dictionary: Record<string, any>[]) {
      return new Map(dictionary.map(position => [Object.keys(position)[0], Object.values(position)[0]]))
    }

    function getActiveFactions() {
      if(!state.colony?.factions) return null

      return state.colony.factions.filter(item => item.active)
    }

    function getActiveFactionsRelations() {
      if(!state.colony?.factions) return null

      const activeFactions = getActiveFactions()
      return activeFactions
        ? new Map(activeFactions.map(faction => [toRaw(faction), toRaw(faction.relations)]))
        : null
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
        getActiveFactionsRelations,
        getFactionDetails,
        getFactionCharacters,
        getCharacterById,
        getCurrentMonthDays,
        addAction,
        isActionsEmpty
    }
})