export const debounce = (func: Function, delay: number) => {
  let lastTime = 0;
  return function (args: any) {
    const now = new Date().getTime();
    if (now - lastTime >= delay) {
      func(args);
      lastTime = now;
    }
  };
};
