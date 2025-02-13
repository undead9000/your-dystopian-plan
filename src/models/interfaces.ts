import { type FactionIdType, type CharacterIdType, type RelationType } from './types'

export interface ColonyRawData {
    id: string,
    currentYear: number,
    governmentName: string,
    governmentStructure: Array<string>,
    governmentPositions: Record<string, string | undefined>[],
    factionStructure: Array<string>,
    factionPositions: Record<string, string>[],
}

export interface FactionRawData {
    id: string,
    name: string,
    description: string,
    active: boolean,
    political: boolean,
    members: Array<string> | null,
    relations: Array<RelationRawData> | null
}

export interface RelationRawData {
    type: string,
    targetId: string,
    value: number
  }

export interface CharacterRawData {
    id: string,
    name: string,
    alive: boolean,
    factionId: string | null,
    factionPosition: string | null
    governmentPosition: string | null
}

export interface GovernmentPosition {
    positionKey: string,
    positionName: string,
    responsibleId: string | null
}
  
export interface MonthDays {
    day: number,
    date: Date,
    shift: number,
    weekdayName: string
}

export interface Relation {
    type: RelationType,
    targetId: FactionIdType | CharacterIdType,
    value: number
}

export interface Func {
    (): void;
}