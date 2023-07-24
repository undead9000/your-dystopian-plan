import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { Character } from '../model/character.model'
import characterData from "../assets/charactersData.json"

export const useCharactersStore = defineStore('charactersStore', () => {
    const state = reactive({
        characters: null as Character[] | null
    })

    function getRelatedCharacters(relatedColonyId:number) {
      return characterData.filter(characterItem => characterItem.relationColonyId === relatedColonyId)
    }

    function getAllCharacters() {
      return characterData
    }

  return {
    state,
    getRelatedCharacters,
    getAllCharacters
  }
})