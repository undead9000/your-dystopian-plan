import { defineStore } from 'pinia'
import { useGameStore } from './gameStore'
import { reactive } from 'vue'
import { ColonyRawData, FactionRawData, CharacterRawData, RelationRawData, GovernmentPosition, Character, Faction, Action } from '../models'
import type { RelationType, FactionIdType, RelatedObjectType } from '../models'
import scenarioData from "../assets/scenario.json"

export const useEngineStore = defineStore('engineStore', () => {
  const gameStore = useGameStore()

  const factionPositionsDictionary = setupSturctureMap(scenarioData.colonyData.factionPositions)
  const governmentPositionsDictionary = setupSturctureMap(scenarioData.colonyData.governmentPositions)

  const factionsData = initFactions(scenarioData.factionsData, scenarioData.charactersData)
  const charactersData = mapCharactersData(factionsData, scenarioData.charactersData)

  const state = reactive({
    actions: new Map
  })

  //******************* Init section *******************//

  function initializeGameStore() {
    const game = {
      colony: initColony(scenarioData.colonyData, charactersData),
      quests: scenarioData.questsData,
      factions: factionsData,
      characters: charactersData,
      hero: initHero(),
    }

    gameStore.init(game)
  }

  function initColony(colonyData: ColonyRawData, characters: Character[]) {
    return {
      id: colonyData.id,
      currentDate: initDate(colonyData.currentYear),
      government: assingCharactersToGovernment(colonyData.governmentStructure, colonyData.governmentName, characters),
      relations: null
    }
  }

  function getGovernmentPositionTitleByKey(key: string) {
    return governmentPositionsDictionary.get(key)
  }

  function setInitialGovernmentStructure(initialStructure: string[], name: string) {
    return {
      id: 'initial colony',
      name: name,
      positions: initialStructure.map(position => ({
        positionKey: position,
        positionName: position,
        responsibleId: null
      } as GovernmentPosition))
    } 
  }

  function assingCharactersToGovernment(initialStructure: string[], name: string, characters: Array<Character>) {
    const structure = setInitialGovernmentStructure(initialStructure, name)
    const assignedIntoGovernment = characters.filter(character => character.governmentPositionKey)

    structure.positions = structure.positions.map(position => {
      const employee = assignedIntoGovernment.find(character => character.governmentPositionKey === position.positionKey)
      const index = assignedIntoGovernment.findIndex(character => character.governmentPositionKey === position.positionKey)
      if (employee) assignedIntoGovernment.splice(index, 1)

      return {
        positionKey: position.positionKey,
        positionName: getGovernmentPositionTitleByKey(position.positionKey),
        responsibleId: employee ? employee.id : null
      }
    })

    return structure
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

  function findFactionsById(factions: Array<Faction>, id: string | null) {
    if (!id) return undefined

    return factions.find(faction => faction.id === id)
  }

  function getFactionPositionTitleByKey(key: string) {
    return factionPositionsDictionary.get(key)
  }

  function initDate(year: number) {
    return new Date(Date.UTC(year, 0, 1, 0, 0))
  }

  function setupSturctureMap(dictionary: Record<string, any>[]) {
    return new Map(dictionary.map(position => [Object.keys(position)[0], Object.values(position)[0]]))
  }

  function mapCharactersData(factions: Array<Faction>, characters: Array<CharacterRawData>) {
    return characters.map(character => ({
      ...character,
      faction: findFactionsById(factions, character.factionId) ?? null,
      factionPositionKey: character.factionPosition ? character.factionPosition : null,
      factionPositionName: character.factionPosition ? getFactionPositionTitleByKey(character.factionPosition) : null,
      governmentPositionKey: character.governmentPosition ? character.governmentPosition : null,
      governmentPositionName: character.governmentPosition ? getGovernmentPositionTitleByKey(character.governmentPosition) : null,
      relations: null
    }))
  }

  function initHero() {
    return {
      id: "hero",
      name: "Earth's consul",
      alive: true,
      factionId: null,
      factionPositionKey: null,
      governmentPositionKey: null,
      faction: null,
      factionPositionName: null,
      governmentPositionName: null,
      relations: null
    }
  }

  //******************* Actions section *******************//

  function executeActions() {
    state.actions.forEach(dailyAction => dailyAction.forEach(action => action.callback()))
    state.actions.clear()

    const date = new Date(gameStore.state.colony.currentDate)
    gameStore.state.colony.currentDate = new Date(date.setMonth(date.getMonth() + 1))
  }


  //TODO: update for non-faction - hero relations
  function updateActionsStack(factionId: FactionIdType | null, currentDate: number, order: number) {
    const targetFaction = gameStore.state.factions.find(faction => faction.id === factionId)

    if (targetFaction && factionId) {
      const action = new Action(0.01, order, () => updateRelation(targetFaction, gameStore.state.hero, 0.01), factionId)

      if(state.actions.get(currentDate) === undefined) {
        state.actions.set(currentDate, [action])
      } else {
        const settledActions = state.actions.get(currentDate)
        const priorityActionIndex = settledActions.findIndex(action => action.order === order)

        priorityActionIndex !== -1 
          ? settledActions.splice(priorityActionIndex, 1, action)
          : settledActions.push(action)
        
        state.actions.set(currentDate, settledActions)
      }
    }
  }

  function isActionsStackEmpty() {
    return !!state.actions.size
  }

  //TODO: rewrite more abstract
  //TODO: rewrite for accepting array of updates
  function updateRelation(update: RelatedObjectType, target: RelatedObjectType, diff?: number) {
    const relation = update.relations?.find(relation => relation.targetId === target.id) ?? null

    if (relation && diff) relation.value += diff
  }

  function updateValue(update: RelatedObjectType, property: string, value: string | number | boolean) {
    if(update.hasOwnProperty(property)) update[property] = value
  }

  function callEvent(id: string) {
    // TODO: must interrupt executing actions stack when reached
  }

  return {
    state,
    initializeGameStore,
    executeActions,
    updateActionsStack,
    isActionsStackEmpty
  }
})