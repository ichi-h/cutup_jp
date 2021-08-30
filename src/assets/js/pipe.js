export const pipe = (args = undefined) => {
  return (...fns) => {
    return fns.reduce((acc, fn) => fn(acc), args);
  };
};
