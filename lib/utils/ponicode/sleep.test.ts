import * as sleep from "../sleep";
// @ponicode
describe("sleep.sleep", () => {
  test("doSomething sleep(ms, () => fn(): void)", async () => {
    const doSomething = jest.fn();
    let result: any = await sleep.sleep(2000, doSomething);
    expect(result).toBe(undefined);
  });
});
