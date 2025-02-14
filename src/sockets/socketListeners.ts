import { AttackInformation } from '@/Interfaces/AttackInformation';
import { timeConstant } from '@/constants/TimeConstants';
import updatePlayerById from '@/helpers/updatePlayerById';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { Player } from '../Interfaces/Player';
import { PlayersRole } from '../Interfaces/PlayerRole';
import { socketName } from '../constants/socketConstants';
import getPlayerById from '../helpers/getPlayerById';
import { deletePlayerById } from '../helpers/utils';
import useStore from '../store/store';

export const useSocketListeners = () => {
  const { players, socket, setPlayers, setDefender, defender, timer, setTimer, setAttacker, addDravokar, addKaotika, attacker, setDisconnectedPlayer, finishTurn, setFinishTurn, setWinner, setChangePlayer, setAttackAnimation } = useStore();
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [startBattle, setStartBattle] = useState<boolean>(false);
  const [finishGame, setFinishGame] = useState<boolean>(false);
  const [swordSwing] = useSound('/sounds/swordSwing.mp3');
  const [swap] = useSound('/sounds/swap.mp3');
  const [pop] = useSound('/sounds/pop.mp3');

  useEffect(() => {
    socket.emit(socketName.SEND_SOCKETID);
    socket.emit(socketName.SEND_USERS);
  }, []);

  useEffect(() => {
    console.log('Connected to socket server: ' + isConnected);
  }, [isConnected]);

  useEffect(() => {
    if (timer === 0) {
      console.log('SEND TURN END SOCKET');
      setFinishTurn(true);
      setTimeout(() => {
        socket.emit(socketName.TURN_END);
      }, timeConstant.TURN_END);
    };
  }, [timer]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function webSetUser(data: Player) {
      console.log('enter in send user' + data.nickname);
      if (data) {
        if (data.isBetrayer) {
          addDravokar(data);
          pop();
        } else {
          addKaotika(data);
          pop();
        }
      }
    }

    function connectedUsers(data: PlayersRole) {
      console.log('conected users ' + data);
      setPlayers(data);
    }

    function gameStart() {
      console.log('enter in socket gameStart');
      setStartBattle(true);
    }

    function webSelectedPlayer(id: string) {
      console.log('enter in selected player');
      setChangePlayer(true);
      setTimeout(() => {
        setChangePlayer(false);
        const selectedPlayer = getPlayerById(players, id);
        selectedPlayer!.isAttacker = false;
        setDefender(selectedPlayer!);
        swap();
      }, timeConstant.SELECTED_PLAYER);
    }

    function attackInfo(attackInfo: AttackInformation) {
      console.log('UPDATE PLAYER SOCKET RECEIVED');
      const id = attackInfo.attack.targetPlayerId;
      const newHp = attackInfo.attack.hit_points;
      
      setAttackAnimation(true);
      swordSwing();

      const updatedPlayers = updatePlayerById(players, id, newHp);
      setPlayers(updatedPlayers);

      const updatedDefender = [...updatedPlayers.dravokar, ...updatedPlayers.kaotika].find(player => player._id === id);
      setDefender(updatedDefender!);

      setTimeout(() => {
        setAttackAnimation(false);
        setFinishTurn(true);
        setTimeout(() => {
          socket.emit(socketName.TARGET_VALUE, { defender: defender?._id, attacker: attacker?._id });
          socket.emit(socketName.TURN_END);
        }, timeConstant.TURN_END);
      }, timeConstant.ATTACK_END);
    }

    function assignTurn(id: string) {
      console.log('assign turn to next person');
      console.log('ATTACKER');
      console.log(attacker?.nickname);
      setTimeout(() => {
        setFinishTurn(false);
        const attacker = getPlayerById(players, id);
        attacker!.isAttacker = true;
        setAttacker(attacker!);
        attacker!.isAttacker = true;
      }, timeConstant.TURN_INIT);
    }

    function removePlayer(id: string): void {
      console.log('remove player with the id ' + id);
      setPlayers(deletePlayerById(players, id));
      setTimeout(() => {
        setFinishTurn(true);
        socket.emit(socketName.TURN_END);
      }, timeConstant.REMOVE_PLAYER);
    }

    function playerDisconnected(nickName: string) {
      console.log('DISCONNECTED PLAYER');
      console.log(nickName);
      setDisconnectedPlayer(nickName);
    }

    function gameEnd(winner: string) {
      console.log('WINNER IS:');
      console.log(winner);
      setWinner(winner);
      setFinishGame(true);
    }

    socket.on(socketName.GAME_END, gameEnd);
    function updateTimer(timer: number) {
      setTimer(timer);
    }

    socket.on(socketName.GAME_END, () => { });
    socket.on(socketName.CONNECT, onConnect);
    socket.on(socketName.DISCONNECT, onDisconnect);
    socket.on(socketName.WEBSENDUSER, webSetUser);
    socket.on(socketName.CONNECTEDUSERS, connectedUsers);
    socket.on(socketName.GAMESTART, gameStart);
    socket.on(socketName.WEBSELECTEDPLAYER, webSelectedPlayer);
    socket.on(socketName.ATTACK_INFO, attackInfo);
    socket.on(socketName.ASSIGNTURN, assignTurn);
    socket.on(socketName.REMOVEPLAYER, removePlayer);
    socket.on(socketName.PLAYERDISCONNECTED, playerDisconnected);
    socket.on(socketName.SEND_TIMER, updateTimer);

    console.log('PLAYERS');
    console.log(players);

    return () => {
      socket.off(socketName.CONNECT, onConnect);
      socket.off(socketName.DISCONNECT, onDisconnect);
      socket.off(socketName.WEBSENDUSER, webSetUser);
      socket.off(socketName.CONNECTEDUSERS, connectedUsers);
      socket.off(socketName.GAMESTART, gameStart);
      socket.off(socketName.WEBSELECTEDPLAYER, webSelectedPlayer);
      socket.off(socketName.ATTACK_INFO, attackInfo);
      socket.off(socketName.ASSIGNTURN, assignTurn);
      socket.off(socketName.REMOVEPLAYER, removePlayer);
      socket.off(socketName.GAME_END, gameEnd);
      socket.off(socketName.PLAYERDISCONNECTED, playerDisconnected);
      socket.off(socketName.SEND_TIMER, updateTimer);
    };
  }, [players, attacker, defender]);


  return { startBattle, finishTurn, finishGame };
};
