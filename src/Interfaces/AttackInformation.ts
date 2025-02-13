
export interface AttackInformation {
  attack: {
    targetPlayerId: string,
    hitPoints: number,
    percentages: {
      critical: number,
      normal: number,
      failed: number,
      fumble: number
    },
    dieRoll: number,
    dealtDamage: number
  },
  luck: {
    attacker: {
      hasLuck: boolean,
      luckRolls: number[],
      luckRollMessages: string[]
    },
    defender: {
      hasLuck: boolean,
      luckRolls: number[],
      luckRollMessages: string[]
    }
  }
}