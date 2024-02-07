export const asyncHandlerWrapper = (callback) => {
  return (...args) => {
    const fnReturn = callback(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };
};
