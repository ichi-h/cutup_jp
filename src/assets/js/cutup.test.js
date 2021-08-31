import { cutup } from "./cutup";

describe("cutup", () => {
  beforeEach(() => {
    const model = {
      src: "隣の客はよく柿食う客だ",
      start: "「",
      end: "。,」,？",
      middle: "は,へ,を,の,で,から,に,て,が,も,、",
      lower: 20,
      upper: 30,
    };

    cutup.init(model);
  });

  test("文章の分割", () => {
    let expected = [
      {
        value: "隣",
        head: 0,
        tail: 5,
      },
      {
        value: "の客",
        head: 5,
        tail: 2,
      },
      {
        value: "はよく柿食う客だ",
        head: 2,
        tail: 1,
      },
    ];

    expect(cutup.splitText()).toStrictEqual(expected);
  });

  test("ランダムに文章を取得", () => {
    let result = new Array(10).fill(0).map((_) => {
      let sentences = cutup.splitText();
      return cutup.pickupSentence(5, sentences).head;
    });

    expect(result).toStrictEqual([5, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
  });
});
