export type Sleep = {
  milliseconds: number;
};
/**
 * The sleep function resolves a promise after a
 * timer of ms milliseconds runs out.
 * @param  {{ms?:Sleep["milliseconds"]}} {ms=1000}
 * @returns {Promise<void>}
 */
export const sleep = async (
  ms = 1000 as Sleep["milliseconds"],
  fn?: () => void
) => {
  await new Promise((resolve) => {
    setTimeout(async () => {
      if (fn) {
        fn();
        console.log("sleep: Hello");
        resolve(fn);
      }
    }, ms);
  });
  console.log("sleep: World!");
};

// https://dev.to/jbranchaud/test-timing-based-js-functions-with-jest-5be
export const delay = (ms: Sleep["milliseconds"], fn: () => void) => {
  setTimeout(() => {
    fn();
  }, ms);
};
