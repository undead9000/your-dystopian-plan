import { Colony, Faction, Character, Government, Relation } from '../models'

export type ColonyIdType = string
export type FactionIdType = string
export type CharacterIdType = string
export type RelatedObjectType = Colony | Faction | Character | Government
export type RelationType = 'FractionFraction' | 'FractionCharacter' | 'CharacterFraction' | 'CharacterCharacter'
export type FactionsRelationsType = Map<Faction, Array<Relation> | null>