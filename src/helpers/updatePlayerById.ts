import { Player } from '../Interfaces/Player';
import { PlayersRole } from '../Interfaces/PlayerRole';

export default function updatePlayerById(players: PlayersRole, id: string, changes: Partial<Player>) : PlayersRole{

  console.log(`update player by id ${id}`);
  const allPlayers = [...players.dravokar, ...players.kaotika].map(player => player._id === id ? {...player, ...changes} : player);

  return {
    dravokar: allPlayers.filter(player => player.isBetrayer === true),
    kaotika: allPlayers.filter(player => player.isBetrayer === false)
  };
}

