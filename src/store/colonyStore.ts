import { defineStore } from 'pinia'
import { reactive } from 'vue'
//import { fetchColony } from '../api'
import colonyData from "../assets/colonyData.json"
import questData from "../assets/questsData.json"

export class Colony {
  constructor(
    public colonyId: number,
    public currentYear: number,
    public quests: Array<any>
  ){}

  setYear(currentYear: number) {
    this.currentYear = currentYear
  }

  setQuests(quests: Array<any>) {
    this.quests = quests
  }
}

export const useColonyStore = defineStore('SingleColony', () => {
    const state = reactive({
        colony: null as Colony | null
    })

    function getColony(colonyId: number, currentYear: number) {
        const quests = getRelatedQuests(colonyId, currentYear)
        updateColony(colonyId, currentYear, quests)
    }

    function getRelatedQuests(colonyId: number, currentYear: number) {
      const relatedQuests = questData.filter(item => item.startYear <= currentYear && item.endYear > currentYear)
      return relatedQuests
    }

    function updateColony(colonyId, currentYear, quests) {
        state.colony = new Colony(colonyId, currentYear, quests)
    }

    return {
        state,
        getColony,
        getRelatedQuests,
        updateColony
    }
})