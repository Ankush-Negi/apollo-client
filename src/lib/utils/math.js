export const getRandomNumber = (length) => {
  const min = 0;
  return Math.random() * (length - min) + min;
};

export const getNextRoundRobin = (length, index) => {
  if (index === (length - 1)) {
    return 0;
  }
  return index + 1;
};
