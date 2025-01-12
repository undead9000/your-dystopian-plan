import { Faction, Relation } from '../models'

export type FactionIdType = string
export type CharacterIdType = string
export type RelationType = 'FractionFraction' | 'FractionCharacter' | 'CharacterFraction' | 'CharacterCharacter'
export type FactionsRelationsType = Map<Faction, Array<Relation> | null>