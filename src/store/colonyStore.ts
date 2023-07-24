import { defineStore } from 'pinia'
import { reactive } from 'vue'
//import { fetchColony } from '../api'
import { useCharactersStore } from '../store/charactersStore'
import { Character } from '../model/character.model'
import questData from "../assets/questsData.json"

const defaultColonyId = 1
const defaultColonyYear = 2258

export class Colony {
  constructor(
    public colonyId: number,
    public currentYear: number,
    public quests: Array<any>,
    public characters: Array<Character>
  ){}

  setId(colonyId: number) {
    this.colonyId = colonyId
  }

  setYear(currentYear: number) {
    this.currentYear = currentYear
  }

  setQuests(quests: Array<any>) {
    this.quests = quests
  }

  setCharacters(characters: Array<any>) {
    this.characters = characters
  }
}

export const useColonyStore = defineStore('colonyStore', () => {
  const charactersStore = useCharactersStore()
  const state = reactive({
      colony: {
        colonyId: defaultColonyId,
        currentYear: defaultColonyYear,
        quests: getRelatedQuests(defaultColonyId, defaultColonyYear),
        characters: charactersStore.getRelatedCharacters(defaultColonyId)
      }
  })

  function getColony(colonyId: number, currentYear: number) {
      //const Colony = fetchColony(colonyId)
      const quests = getRelatedQuests(colonyId, currentYear)
      updateColony(colonyId, currentYear, quests, charactersStore.getRelatedCharacters(state.colony.colonyId))
  }

  function getRelatedQuests(colonyId: number, currentYear: number) {
    //set quests by parameters of current colony 
    return questData.filter(item => item.startYear <= currentYear && item.endYear >= currentYear)
  }

  function updateColony(colonyId, currentYear, quests: Array<any>, characters: Array<any>) {
    state.colony.colonyId = colonyId
    state.colony.currentYear = currentYear
    state.colony.quests = quests
    state.colony.characters = characters
  }

  function getRelatedQuestsNames() {
    return state.colony.quests.map(quest => quest.title).join(', ')
  }

  function getRelatedCharactersNames() {
    return charactersStore.getRelatedCharacters(state.colony.colonyId).map(character => character.name).join(', ')
  }

  return {
      state,
      getColony,
      updateColony,
      getRelatedQuestsNames,
      getRelatedCharactersNames
  }
})