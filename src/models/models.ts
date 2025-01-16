import { type FactionIdType, type CharacterIdType } from './types'
import { GovernmentPosition, Relation } from './interfaces'
//import { FactionRawData } from '../models'

export class Colony {
  constructor(
    public id: string,
    public currentDate: Date,
    public quests: Array<Quest> | null,
    public factions: Array<Faction> | null,
    public characters: Array<Character> | null,
    public government: Government | null,
    public hero: Character,
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
  ){
    this.id = id,
    this.name = name,
    this.description = description,
    this.active = active,
    this.political = political
    this.members = members,
    this.relations = relations
  }
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
    public governmentPositionName: string | null,
    public relations: Array<Relation> | null
  ){}
}

export class Government {
  constructor(
    public name: string,
    public positions: Array<GovernmentPosition>
  ){}
}

//TODO: add date interval
//TODO: batch of actions
// export class Action {
//   constructor(
//     public id: string,
//     public ownerId: FactionIdType | CharacterIdType,
//     public type: string,
//     public value: number,
//     public priority: number,
//     public callback: Function
//   ) {}
// }
