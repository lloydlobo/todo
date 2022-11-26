import * as sleep from "./sleep";
import { Sleep } from "./sleep";

describe("sleep.sleep", () => {
  const ms: Sleep["milliseconds"] = 2;

  test(`should sleep and next fn() must doSomething`, async () => {
    const doSomething = jest.fn();
    await sleep.sleep(ms, doSomething);

    expect(doSomething).toHaveBeenCalled();
  });
});

describe("sleep.delay fakeTimer", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const ms: Sleep["milliseconds"] = 2000;

  test(`should sleep for ${ms} milliseconds`, async () => {
    const doSomething = jest.fn();
    sleep.delay(ms, () => doSomething());
    jest.advanceTimersByTime(ms);

    expect(doSomething).toHaveBeenCalled();
  });
});

describe("sleep.delay", () => {
  //  https://stackoverflow.com/questions/28504545/how-to-mock-a-constructor-like-new-date
  //  Be aware that using fake timers affects nock and causes it to miss HTTP //  matches. I wasted a lot of time until I figured out fake times were the //  cause my specs failing.
  beforeEach(() => jest.useFakeTimers());
  // https://testing-library.com/docs/using-fake-timers/
  // When using fake timers in your tests, // all of the code inside your test uses fake timers.
  // When using fake timers, you need to remember // to restore the timers after your test runs.
  // The main reason to do that is to prevent 3rd party libraries running after // your test finishes (e.g cleanup functions), from being coupled to your fake // timers and use real timers instead.
  // Running all pending timers and switching to real timers using Jest
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const ms: Sleep["milliseconds"] = 2000;

  test(`does something after ${ms} milliseconds`, () => {
    const doSomething = jest.fn();
    sleep.delay(ms, doSomething);
    jest.advanceTimersByTime(ms);

    expect(doSomething).toHaveBeenCalled();
  });
});
