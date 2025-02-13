import { Player } from '../Interfaces/Player';
import { PlayersRole } from '../Interfaces/PlayerRole';
export default function getPlayerById(players: PlayersRole, id: string) : Player | undefined{
  console.log('in get player by Id');
  console.log(players);

  const allPlayers = [...players.dravokar, ...players.kaotika];
  return allPlayers.find(player => player._id === id);
}