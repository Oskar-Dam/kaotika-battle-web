import { Player } from '../Interfaces/Player';

export function getPhotoByLoyalty(player: Player) {
  const isBetrayer = player.isBetrayer;
  let images;

  switch (isBetrayer) {
  case false:
    images = { idle: '/images/warrior_1_1.png', attack: '/images/warrior_1_attack.gif' };
    break;

  case true:
    images = { idle: '/images/warrior_2_1.png', attack: '/images/warrior_2_attack.gif' };
    break;

  default:
    images = { idle: '', attack: '' };
  }

  return images;
}