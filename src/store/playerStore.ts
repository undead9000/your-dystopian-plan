import { defineStore } from 'pinia'
import { reactive } from 'vue'

export class Player {
  constructor(
    public id: number,
    public name: string,
    public reputation: number
  ){}

  setId(id: number) {
    this.id = id
  }

  setName() {

  }

  setReputation() {

  }
}

export const useSinglePostStore = defineStore('SinglePost', () => {
  

  return {

  }
})