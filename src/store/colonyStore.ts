import { defineStore } from 'pinia'
import { reactive } from 'vue'
//import { fetchColony } from '../api'
import { useCharactersStore } from '../store/charactersStore'
import { Character } from '../model/character.model'
import questData from "../assets/questsData.json"

export class Colony {
  constructor(
    public colonyId: number,
    public currentYear: number,
    public quests: Array<any>,
    public characters: Array<Character>
  ){}

  setYear(currentYear: number) {
    this.currentYear = currentYear
  }

  setQuests(quests: Array<any>) {
    this.quests = quests
  }
}

export const useColonyStore = defineStore('colonyStore', () => {
    const state = reactive({
        colony: null as Colony | null
    })

    const charactersStore = useCharactersStore()

    function getColony(colonyId: number, currentYear: number) {
        //const Colony = fetchColony(colonyId)
        const quests = getRelatedQuests(colonyId, currentYear)

        updateColony(colonyId, currentYear, quests, charactersStore.getRelatedCharacters())
    }

    function getRelatedQuests(colonyId: number, currentYear: number) {
      //set quests by parameters of current colony 
      const relatedQuests = questData.filter(item => item.startYear <= currentYear && item.endYear >= currentYear)
      return relatedQuests
    }

    function updateColony(colonyId, currentYear, quests, characters) {
        state.colony = new Colony(colonyId, currentYear, quests, characters)
    }

    return {
        state,
        getColony,
        updateColony
    }
})