import { AntidotePotion } from './AntidotePotion';
import { EnhancerPotion } from './EnhancerPotion';
import { HealingPotion } from './HealingPotion';
import { Inventory } from './Inventory';
import { Modifier } from './Modifier';
import { Profile } from './Profile';
import { Status } from './Status';
// import { Weapon } from "./Weapon";

export interface Player {
  _id: string;
  name: string;
  nickname: string;
  avatar: string;
  email: string;
  level: number;
  socketId: string;
  profile: Profile | null;
  attributes: Modifier;
  base_attributes: Modifier;
  equipment: {
    // weapon: Weapon,
    weapon: string,
    healing_potion: HealingPotion,
    antidote_potion: AntidotePotion,
    enhancer_potion: EnhancerPotion,
  },
  inventory: Inventory,
  status: Status,
  role: string,
  isBetrayer: boolean,
  isAlive: boolean,
}