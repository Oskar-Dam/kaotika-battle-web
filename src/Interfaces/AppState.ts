/* eslint-disable no-unused-vars */
import { Socket } from 'socket.io-client';
import { Player } from './Player';
import { PlayersRole } from './PlayerRole';

export interface AppState {
  players: PlayersRole;
  addKaotika: (kaotika: Player) => void;
  addDravocar: (dravocar: Player) => void;
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
}