import { type FactionIdType, type CharacterIdType } from './types'
import { GovernmentPosition, Relation } from './interfaces'

export class Colony {
  constructor(
    public id: string,
    public currentDate: Date,
    public quests: Array<Quest> | null,
    public factions: Array<Faction> | null,
    public characters: Array<Character> | null,
    public government: Government | null,
    public hero: Character
  ){}
}

export class Quest {
  constructor(
      public id: string,
      public startYear: number,
      public endYear: number,
      public title: string
  ){}
}

export class Faction {
  constructor(
      public id: FactionIdType,
      public name: string,
      public description: string,
      public active: boolean,
      public political: boolean,
      public members: Array<string> | null,
      public relations: Array<Relation> | null
  ){}
}

//TODO: implement multifraction binding
export class Character {
  constructor(
    public id: CharacterIdType,
    public name: string,
    public alive: boolean,
    public factionId: string | null,
    public faction: Faction | null,
    public factionPositionKey: string | null,
    public factionPositionName: string | null,
    public governmentPositionKey: string | null,
    public governmentPositionName: string | null
  ){}
}

export class Government {
  constructor(
    public name: string,
    public positions: Array<GovernmentPosition>
  ){}
}
