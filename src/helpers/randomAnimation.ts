export const randomAnimation = (animations: string[]): string => {
  const randomIndex = Math.floor(Math.random() * animations.length);
  return animations[randomIndex];
};