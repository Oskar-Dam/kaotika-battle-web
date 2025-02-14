import { PlayersRole } from '../Interfaces/PlayerRole';

export default function updatePlayerById(players: PlayersRole, id: string, newHp: number): PlayersRole {
  console.log(`update player by id ${id}`);
  console.log('UPDATE PLAYERS HP');

  // Player before attack
  const playerBeforeUpdate = [...players.dravokar, ...players.kaotika].find(player => player._id === id);
  console.log('Player antes de la actualización:', playerBeforeUpdate);

  const adjustedHp = newHp < 0 ? 0 : newHp;

  const allPlayers = [...players.dravokar, ...players.kaotika].map(player => player._id === id ? { ...player, attributes: {...player.attributes, hit_points: adjustedHp }}: player);

  // Player after attack
  const playerAfterUpdate = allPlayers.find(player => player._id === id);
  console.log('Player después de la actualización:', playerAfterUpdate);

  return {
    dravokar: allPlayers.filter(player => player.isBetrayer === true),
    kaotika: allPlayers.filter(player => player.isBetrayer === false)
  };
}