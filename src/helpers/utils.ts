import { PlayersRole } from '../Interfaces/PlayerRole';

export function deletePlayerById(players: PlayersRole, id: string) : PlayersRole{
  const newKaotika = players.kaotika.filter(player => player._id !== id);
  const newDravokar = players.dravocar.filter(player => player._id !== id);
  
  return {
    kaotika: newKaotika,
    dravocar: newDravokar
  };
}