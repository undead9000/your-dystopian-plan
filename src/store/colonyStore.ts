import { defineStore } from 'pinia'
import { reactive } from 'vue'
import questData from "../assets/questsData.json"
import initialColony from "../assets/initialColonyData.json"

export class Colony {
  constructor(
    public colonyId: number,
    public currentYear: number,
    public quests: Array<any> | null
  ){}
}

export const useColonyStore = defineStore('singleColonyStore', () => {
    const state = reactive({
        colony: null as Colony | null
    })

    function init() {
      state.colony = {
        colonyId: initialColony.colonyId,
        currentYear: initialColony.currentYear,
        quests: initialColony.quests
      }
    }

    function nextTurn() {
      if(!state.colony) return
      state.colony.currentYear = state.colony.currentYear + 1
    }

    function getRelatedQuests() {
      if(!state.colony?.currentYear) return []

      const currentYear = state.colony.currentYear
      const relatedQuests = questData.filter(item => item.startYear <= currentYear && item.endYear > currentYear)
      return relatedQuests
    }

    return {
        state,
        init,
        nextTurn,
        getRelatedQuests,
    }
})