import { splitText } from "./main";

test("文章の分割", () => {
  let srcText = "すもももももももものうち";
  let splitPoint = {
    start: ["「", "（"],
    end: ["。", "」", "）", "？"],
    middle: [
      "は",
      "へ",
      "を",
      "の",
      "で",
      "から",
      "に",
      "て",
      "が",
      "も",
      "、",
    ],
  };

  let expect = [
    {
      value: "すももも",
      head: 0,
      tail: 11,
    },
    {
      value: "ももも",
      head: 11,
      tail: 11,
    },
    {
      value: "ももの",
      head: 11,
      tail: 5,
    },
    {
      value: "うち",
      head: 5,
      tail: 1,
    },
  ];

  expect(splitText(srcText, splitPoint)).toBe(expect);
});
