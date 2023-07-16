import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { Character } from '../model/character.model'
import characterData from "../assets/charactersData.json"

export const useCharactersStore = defineStore('charactersStore', () => {
    const state = reactive({
        characters: null as Character[] | null
    })

    function getRelatedCharacters() {
        const relatedCharacters = characterData
        return relatedCharacters
    }

  return {
    state,
    getRelatedCharacters
  }
})