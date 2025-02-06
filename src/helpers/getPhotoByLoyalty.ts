import { Player } from '../Interfaces/Player';

export function getPhotoByLoyalty(player: Player): string {
  const isBetrayer = player.isBetrayer;
  let image;

  switch (isBetrayer) {
  case false:
    image = '/images/warrior_1_1.png';
    break;

  case true:
    image = '/images/warrior_2_1.png';
    break;

  default:
    image = '';
  }

  return image;
}