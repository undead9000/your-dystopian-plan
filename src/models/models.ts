export class Colony {
  constructor(
    public id: string,
    public currentYear: number,
    public quests: Array<Quest> | null,
    public factions: Array<any> | null
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
        public members: Array<Character> | null
    ){}
}

export class Character {
    constructor(
      public id: string,
      public name: string,
      public alive: boolean,
      public faction: string
    ){}
  }