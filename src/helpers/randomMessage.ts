export const randomMessage = (messages: { [key: string]: string }): string => {
  const values = Object.values(messages);
  console.log(values);
  
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
};
