/* eslint-disable no-unused-vars */
import { Socket } from 'socket.io-client';
import { Player } from './Player';
import { PlayersRole } from './PlayerRole';

export interface AppState {
  players: PlayersRole;
  addKaotika: (kaotika: Player) => void;
  addDravokar: (dravokar: Player) => void;
  socket: Socket;
  round: number;
  addRound: (by: number) => void;
  attacker: Player | null;
  defender: Player | null;
  setAttacker: (attacker: Player | null) => void;
  setDefender: (defender: Player | null) => void;
  setPlayers: (players: PlayersRole) => void;
  timer: number;
  setTimer: (timer: number) => void;
  disconnectedPlayer: string,
  setDisconnectedPlayer: (disconnectedPlayer: string) => void;
  finishTurn: boolean;
  setFinishTurn: (finishTurn: boolean) => void;
  winner: string,
  setWinner: (winner: string) => void;
  performingBarAnimation: boolean,
  setPerformingBarAnimation: (performingBarAnimation: boolean) => void;
  changeRightPlayerAnimation: boolean;
  setChangeRightPlayerAnimation: (changePlayer: boolean) => void;
  changeLeftPlayerAnimation: boolean;
  setChangeLeftPlayerAnimation: (changePlayer: boolean) => void;
  attackRightPlayerAnimation: boolean;
  setAttackRightPlayerAnimation: (attackAnimation: boolean) => void;
  attackLeftPlayerAnimation: boolean;
  setAttackLeftPlayerAnimation: (attackAnimation: boolean) => void;
  message: string,
  setMessage: (message: string) => void;
  rollMessage: string,
  setRollMessage: (rollMessage: string) => void;
  battleMessage: string,
  setBattleMessage: (battleMessage: string) => void;
}