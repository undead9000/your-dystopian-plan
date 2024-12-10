import { defineStore } from 'pinia'
import { reactive } from 'vue'

export class Character {
  constructor(
    public id: number,
    public name: string,
    public alive: boolean
  ){}

  setId(id: number) {
    this.id = id
  }

  setName() {}

  setReputation() {}
}

export const useSinglePostStore = defineStore('singleCharacterStore', () => {
  const state = reactive({
    char: null as Character[] | null 
  })

  return {
    state,
  }
})