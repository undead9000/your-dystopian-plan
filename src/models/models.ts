import type { FactionIdType, CharacterIdType, ColonyIdType } from './types'
import { GovernmentPosition, Relation, Func } from './interfaces'

export class Game {
  colony: Colony
  quests: Quest[]
  factions: Faction[]
  characters: Character[]
  hero: Character

  constructor() {
    this.colony = new Colony()
    this.quests = []
    this.factions = []
    this.characters = []
    this.hero = new Character()
  }
}

export class Colony {
  constructor(
    public id: string = '',
    public currentDate: Date = new Date(),
    public government: Government | null = null,
    public relations: Array<Relation> | null = null
  ) {}
}

export class Quest {
  constructor(
      public id: string = '0',
      public startYear: number = 0,
      public endYear: number = 0,
      public title: string = ''
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
    public id: CharacterIdType = '',
    public name: string = '',
    public alive: boolean = true,
    public factionId: string | null = null,
    public faction: Faction | null = null,
    public factionPositionKey: string | null = null,
    public factionPositionName: string | null = null,
    public governmentPositionKey: string | null = null,
    public governmentPositionName: string | null = null,
    public relations: Array<Relation> | null = null
  ){}
}

export class Government {
  constructor(
    public id: ColonyIdType,
    public name: string,
    public positions: Array<GovernmentPosition>,
    public relations?: Array<Relation> | null
  ){}
}

//TODO: add date interval
//TODO: batch of actions
export class Action {
  constructor(
    public value: number,
    public priority: number,
    //public callback: Function
    public callback: Func,
    public ownerId?: FactionIdType | CharacterIdType,
    public targetId?: FactionIdType | CharacterIdType,
  ) {}
}
