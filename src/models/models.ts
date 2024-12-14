export class Colony {
  constructor(
    public id: string,
    public currentYear: number,
    public quests: Array<Quest> | null,
    public factions: Array<Faction> | null,
    public characters: Array<Character> | null
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
      public factionName: string,
      public description: string,
      public active: boolean,
      public political: boolean,
      public members: Array<Character> | null
  ){}
}

//TODO: implement multifraction binding
export class Character {
  constructor(
    public id: string,
    public name: string,
    public alive: boolean,
    public factionIds: string | null
  ){}
}