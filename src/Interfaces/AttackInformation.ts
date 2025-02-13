export type AttackInformation = {
  attack: {
    targetPlayerId: string,
    hit_points: number,
    percentages: Percentages,
    dieRoll: number,
    dealedDamage: number
  },
  luck: {
    attacker: {
      hasLuck: boolean,
      luckRolls: number[],
      luckRollMessage?: string | undefined,
    },
    defender: {
      hasLuck: boolean,
      luckRolls: number[],
      luckRollMessage: string | undefined,
    }
  }
};

export interface Percentages {
  critical: number,
  normal: number,
  failed: number,
  fumble: number
}