import { Cutup } from "./cutup";

describe("cutup", () => {
  let cutup;

  beforeEach(() => {
    const model = {
      src: "隣の客はよく柿食う客だ",
      start: "「",
      end: "。,」,？",
      middle: "は,へ,を,の,で,から,に,て,が,も,、",
      lower: 20,
      upper: 30,
    };

    cutup = Cutup.newInstanceFromModel(model);
  });

  test("インスタンスが生成されているか", () => {
    let expected = new Cutup(
      "隣の客はよく柿食う客だ",
      {
        "「": 0,
        "。": 1,
        "」": 1,
        "？": 1,
        は: 2,
        へ: 3,
        を: 4,
        の: 5,
        で: 6,
        から: 7,
        に: 8,
        て: 9,
        が: 10,
        も: 11,
        "、": 12,
      },
      {
        lower: 20,
        upper: 30,
      }
    );

    expect(cutup).toStrictEqual(expected);
  });

  test("文章の分割", () => {
    let expected = [
      { value: "隣", head: 0, tail: 5 },
      { value: "の客", head: 5, tail: 2 },
      { value: "はよく柿食う客だ", head: 2, tail: 0 },
    ];

    expect(cutup.splitText()).toStrictEqual(expected);
  });

  describe("異常系", () => {
    test("上限と下限が矛盾しているとき", () => {
      cutup.limit.lower = 100;
      try {
        cutup.checkProps();
      } catch (_) {
        return;
      }
      throw Error("上限と下限が矛盾しています。");
    });
  });
});
