export const sumArr = arr => arr.reduce((sum, cur) => sum + cur, 0);

export const sleep = duration => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration * 1000);
  });
};
