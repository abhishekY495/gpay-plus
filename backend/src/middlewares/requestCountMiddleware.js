export let hitCount = 0;

export const requestCount = (req, res, next) => {
  hitCount = hitCount + 1;
  next();
};
