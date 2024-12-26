export class Colony {
  constructor(
    public id: string,
    public currentDate: Date,
    public quests: Array<Quest> | null,
    public factions: Array<Faction> | null,
    public characters: Array<Character> | null,
    public government: Government | null
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
      public id: string,
      public name: string,
      public description: string,
      public active: boolean,
      public political: boolean,
      public members: Array<string> | null
  ){}
}

//TODO: implement multifraction binding
export class Character {
  constructor(
    public id: string,
    public name: string,
    public alive: boolean,
    public factionId: string | null,
    public faction: Faction | null,
    public factionPosition: string | null,
    public factionPositionName: string | null,
    public governmentPosition: string | null,
    public governmentPositionName: string | null
  ){}
}

export interface GovernmentPosition {
  position: string,
  positionName: string,
  responsibleId: string | null
}

export class Government {
  constructor(
    public name: string,
    public positions: Array<GovernmentPosition>
  ){}
}