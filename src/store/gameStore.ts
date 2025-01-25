import { defineStore } from 'pinia'
import { reactive, toRaw } from 'vue'
import { Game, MonthDays } from '../models'
import { type FactionsRelationsType } from '../models'

export const useGameStore = defineStore('gameStore', () => {
  const state = reactive(new Game())

  function init(game: Game) {
    state.colony = game.colony
    state.quests = game.quests
    state.factions = game.factions
    state.characters = game.characters
    state.hero = game.hero
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

  function getRelatedQuests() {
    if(!state.quests) return []

    const currentYear = state.colony.currentDate.getFullYear()
    return state.quests.filter(item => item.startYear <= currentYear && item.endYear > currentYear) ?? []
  }

  function getActiveFactions() {
    if(!state.factions) return null

    return state.factions.filter(item => item.active)
  }

  function getActiveFactionsRelations(): FactionsRelationsType | null {
    if(!state.factions) return null

    const activeFactions = getActiveFactions()
    return activeFactions
      ? new Map(activeFactions.map(faction => [toRaw(faction), toRaw(faction.relations)]))
      : null
  }

  function getFactionDetails(factionId: string) {
    if(!state.factions) return null

    return state.factions.find(faction => faction.id === factionId) ?? null
  }

  function getFactionCharacters(factionId: string) {
    if(!state.characters) return null

    return state.characters.filter(character => character.alive && character.factionId === factionId) ?? null
  }

  function getCharacterById(characterId: string) {
    if(!state.characters) return null

    return state.characters.find(character => character.id === characterId) ?? null
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
    getRelatedQuests,
    getActiveFactions,
    getActiveFactionsRelations,
    getFactionDetails,
    getFactionCharacters,
    getCharacterById,
    getCurrentMonthDays,
  }
})