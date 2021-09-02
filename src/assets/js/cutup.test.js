import { Cutup } from "./cutup";

describe("cutup", () => {
  let cutup;

  beforeEach(() => {
    const model = {
      src: { value: "隣の客はよく柿食う客だ" },
      start: { value: "「" },
      end: { value: "。,」,？" },
      middle: { value: "は,へ,を,の,で,から,に,て,が,も,、" },
      lower: { value: 20 },
      upper: { value: 30 },
    };

    cutup = Cutup.newInstanceFromModel(model);
  });

  test("文章の分割", () => {
    let expected = [
      { value: "隣", head: 0, tail: 5 },
      { value: "の客", head: 5, tail: 2 },
      { value: "はよく柿食う客だ", head: 2, tail: 0 },
    ];

    expect(cutup.splitText()).toStrictEqual(expected);
  });
});
