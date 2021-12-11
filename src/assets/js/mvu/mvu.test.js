import { update } from "./update";
import { init } from "./model";

jest.mock("./view", () => ({
  view: jest.fn((model, targets) => [model, targets]),
}));

describe("update", () => {
  describe("Change", () => {
    const dispatch = update(init);

    test("srcの更新", () => {
      const [newModel, targets] = dispatch({
        type: "Change",
        target: "src",
        newValue: "すもももももももものうち",
      });
      expect(newModel.src).toBe("すもももももももものうち");
      expect(targets.length).toBe(0);
    });

    test("startの更新", () => {
      const [newModel, targets] = dispatch({
        type: "Change",
        target: "start",
        newValue: "#",
      });
      expect(newModel.start).toBe("#");
      expect(targets.length).toBe(0);
    });

    test("endの更新", () => {
      const [newModel, targets] = dispatch({
        type: "Change",
        target: "end",
        newValue: "#",
      });
      expect(newModel.end).toBe("#");
      expect(targets.length).toBe(0);
    });

    test("middleの更新", () => {
      const [newModel, targets] = dispatch({
        type: "Change",
        target: "middle",
        newValue: "#",
      });
      expect(newModel.middle).toBe("#");
      expect(targets.length).toBe(0);
    });

    test("lowerの更新", () => {
      const [newModel, targets] = dispatch({
        type: "Change",
        target: "lower",
        newValue: 0,
      });
      expect(newModel.lower).toBe(0);
      expect(targets.length).toBe(0);
    });

    test("upperの更新", () => {
      const [newModel, targets] = dispatch({
        type: "Change",
        target: "upper",
        newValue: 0,
      });
      expect(newModel.upper).toBe(0);
      expect(targets.length).toBe(0);
    });
  });

  test("Cutup (文章生成)", () => {
    const [newModel, targets] = update(init)({
      type: "Cutup",
    });

    expect(
      newModel.lower <= newModel.result.length &&
        newModel.result.length <= newModel.upper
    ).toBe(true);
    expect(targets.includes("result")).toBe(true);
  });

  describe("異常系", () => {
    test("不明なメッセージを受け取った時", () => {
      try {
        update(init)({ type: "Error" });
      } catch (_) {
        return;
      }
      throw Error("不明なメッセージが通過しています。");
    });
  });
});
