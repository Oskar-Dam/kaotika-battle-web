import { PlayersRole } from '../Interfaces/PlayerRole';

export default function updatePlayerById(players: PlayersRole, id: string, newHp: number): PlayersRole {
  console.log('UPDATE PLAYERS HP');

  const allPlayers = [...players.dravokar, ...players.kaotika].map(player => player._id === id ? { ...player, attributes: { ...player.attributes, hit_points: newHp }}: player);

  return {
    dravokar: allPlayers.filter(player => player.isBetrayer === true),
    kaotika: allPlayers.filter(player => player.isBetrayer === false)
  };
}