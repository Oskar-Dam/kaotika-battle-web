import { useEffect, useState } from 'react';
import { Player } from '../Interfaces/Player';
import { PlayersRole } from '../Interfaces/PlayerRole';
import getPlayerById from '../helpers/getPlayerById';
import updatePlayerById from '../helpers/updatePlayerById';
import { deletePlayerById } from '../helpers/utils';
import useStore from '../store/store';
import { socketName } from './socketConstants';

export const useSocketListeners = () => {
  const { players, socket, setPlayers, setDefender, timer, setTimer, setAttacker, addDravocar, addKaotika, attacker, setDisconnectedPlayer, finishTurn, setFinishTurn } = useStore();
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [startBattle, setStartBattle] = useState<boolean>(false);

  useEffect(() => {
    socket.emit('web-sendSocketId');
    socket.emit('web-sendUsers');
  }, []);

  useEffect(() => {
    console.log('Connected to socket server: ' + isConnected);
  }, [isConnected]);

  useEffect(() => {
    if (timer === 0) {
      console.log('SEND TURN END SOCKET');
      setFinishTurn(true);
      setTimeout(() => {
        socket.emit('web-turnEnd');
      }, 1000);
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
          addDravocar(data);
        } else {
          addKaotika(data);
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
      setDefender(getPlayerById(players, id)!);
    }

    function updatePlayer(id: string, attr: Partial<Player>, totalDamage: number) {
      console.log('daño: ' + totalDamage);
      setPlayers(updatePlayerById(players, id, attr));
      setFinishTurn(true);
      setTimeout(() => {
        socket.emit('web-turnEnd');
      }, 1000);
    }

    function assignTurn(id: string) {
      console.log('assign turn to next person');
      setAttacker(getPlayerById(players, id)!);
      console.log('ATTACKER');
      console.log(attacker?.name);
      setFinishTurn(false);
    }

    function removePlayer(id: string): void {
      console.log('remove player with the id ' + id);
      setPlayers(deletePlayerById(players, id));
    }

    function playerDisconnected(nickName: string) {
      console.log('DISCONNECTED PLAYER');
      console.log(nickName);
      setDisconnectedPlayer(nickName);
    }

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
    socket.on(socketName.UPDATEPLAYER, updatePlayer);
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
      socket.off(socketName.UPDATEPLAYER, updatePlayer);
      socket.off(socketName.ASSIGNTURN, assignTurn);
      socket.off(socketName.REMOVEPLAYER, removePlayer);
      socket.off(socketName.GAME_END,);
      socket.off(socketName.PLAYERDISCONNECTED, playerDisconnected);
      socket.off(socketName.SEND_TIMER, updateTimer);
    };
  }, [players]);


  return { startBattle, finishTurn };
};
