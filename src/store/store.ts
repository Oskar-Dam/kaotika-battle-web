import { io } from 'socket.io-client';
import { create } from 'zustand';
import { AppState } from '../Interfaces/AppState';
import { Player } from '../Interfaces/Player';
import { PlayersRole } from '../Interfaces/PlayerRole';


const useStore = create<AppState>()((set) => ({

  players: { dravokar: [], kaotika: [] },
  addKaotika: (kaotika: Player) => set((state) => ({ players: { ...state.players, kaotika: [...state.players.kaotika, kaotika] } })),
  addDravokar: (dravokar: Player) => set((state) => ({ players: { ...state.players, dravokar: [...state.players.dravokar, dravokar] } })),
  socket: io(import.meta.env.VITE_SERVER_URL as string),
  round: 1,
  addRound: (by: number) => set((state) => ({ round: state.round += by })),
  attacker: null,
  defender: null,
  setAttacker: (attacker: Player | null) => set(() => ({ attacker: attacker })),
  setDefender: (defender: Player | null) => set(() => ({ defender: defender })),
  setPlayers: (players: PlayersRole) => set(() => ({ players: players })),
  timer: -1,
  setTimer: (timer: number) => set(() => ({ timer: timer })),
  disconnectedPlayer: '',
  setDisconnectedPlayer: (disconnectedPlayer: string) => set(() => ({ disconnectedPlayer: disconnectedPlayer })),
  finishTurn: false,
  setFinishTurn: (finishTurn: boolean) => set(() => ({ finishTurn: finishTurn })),
  winner: '',
  setWinner: (winner: string) => set(() => ({ winner: winner })),
  performingBarAnimation: false,
  setPerformingBarAnimation: (performingBarAnimation: boolean) => set(() => ({ performingBarAnimation: performingBarAnimation })),
  changeRightPlayerAnimation: false,
  setChangeRightPlayerAnimation: (changeRightPlayerAnimation: boolean) => set(() => ({ changeRightPlayerAnimation: changeRightPlayerAnimation })),
  changeLeftPlayerAnimation: false,
  setChangeLeftPlayerAnimation: (changeLeftPlayerAnimation: boolean) => set(() => ({ changeLeftPlayerAnimation: changeLeftPlayerAnimation })),
  attackRightPlayerAnimation: false,
  setAttackRightPlayerAnimation: (attackRightPlayerAnimation: boolean) => set(() => ({ attackRightPlayerAnimation: attackRightPlayerAnimation })),
  attackLeftPlayerAnimation: false,
  setAttackLeftPlayerAnimation: (attackLeftPlayerAnimation: boolean) => set(() => ({ attackLeftPlayerAnimation: attackLeftPlayerAnimation })),
  message: '',
  setMessage: (message: string) => set(() => ({ message: message })),
  rollMessage: '',
  setRollMessage: (rollMessage: string) => set(() => ({ rollMessage: rollMessage })),
  battleMessage: '',
  setBattleMessage: (battleMessage: string) => set(() => ({ battleMessage: battleMessage })),
}));

export default useStore;